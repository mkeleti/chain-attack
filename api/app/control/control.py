"""
Created by Michael Keleti

This script initiates a 51% attack.
"""
import docker
from docker.models import containers, networks, volumes, images
from fastapi.encoders import jsonable_encoder
import json
import codecs
from enum import Enum

IMAGE = "mkeleti/geth-attack"  # Image to create new containers from
BOOTNODE = '"enode://43974299a4c52b220d8eed430a7ed1479f29548041e3ca67ddc1a4886835878c174d45dfd9e73ebd4901e8071c5bb19003f52e4e408e8ec5ce350f8f74a335a8@255.255.255.242:30301"'  # Primary bootnode address
TYPES = {"container": containers.Container, "network": networks.Network,
         "volume":  volumes.Volume, "image": images.Image}
CLIENT = docker.from_env()


# TODO Refactor and simplify methods. Implement more structured class design.


class Client:
    def __init__(self, container: containers.Container):
        self.container = container
        self.name = container.name
        self.peers = self.getPeers()
        self.type = self.getType()
        if self.checkClient() == False:
            raise Exception("Container not a Geth Client.")

    def injectConsole(self, cmd: str) -> str:
        """Inject a command into the geth RPC console"""
        return self.container.exec_run(workdir="/root/.ethereum",
                                       cmd="geth attach /root/.ethereum/geth.ipc --exec '"+cmd+"'",).output

    def checkClient(self) -> bool:
        """Checks if container is a geth client"""
        image = str(self.container.image)
        if image.count("geth") > 0:
            return True
        else:
            return False

    def getPeers(self) -> str:
        """Gets the peers of the geth client."""
        return self.injectConsole("admin.peers")

    def getNodeInfo(self) -> str:
        """Retrieves the geth nodes info"""
        return self.injectConsole("admin.nodeInfo")

    def getType(self) -> str:
        """Get types of client"""
        types = ["miner", "rpc", "boot"]
        for type in types:
            if self.name.count(type) > 0:
                return type
        else:
            raise Exception("Container does not match type.")


class Network:
    def __init__(self):
        self.clients = self.getClients()
        sortedClients = self.sortClients()
        self.miners = sortedClients["miner"]
        self.rpcs = sortedClients["rpc"]
        self.boots = sortedClients["boot"]

    def getClients(self) -> dict[str, Client]:
        clients = {}
        containers = CLIENT.containers
        for container in containers.list(all):
            try:
                client = Client(container)
            except:
                None
            else:
                clients[client.name] = client
        return clients

    def sortClients(self) -> dict[str, dict[str, Client]]:
        clients = self.getClients()
        clientDict = {"miner": {}, "rpc": {}, "boot": {}}
        for clientName in clients:
            clientDict[clients[clientName].type][clientName] = clients[clientName]
        return clientDict


class Control:
    def __init__(self):
        CLIENT = docker.from_env()
        self.apiclient = docker.APIClient()
        self.containers = CLIENT.containers
        self.networks = CLIENT.networks
        self.volumes = CLIENT.volumes
        self.images = CLIENT.images
        self.bootnode = BOOTNODE

    def fetchNodes(self, all=False) -> dict[str, list[containers.Container]]:
        """
        This method is responsible for fetching each geth node and sorting them by function.

        Returns: 
        dict: Dictionary containing arrays of containers; {"miners", "rpcs", "boots"}
        """
        nodes = {"miners": [], "rpcs": [], "boots": []}
        # Defines node dictionary to return
        for container in self.containers.list(all):
            # For each container currently running
            image = str(container.image)
            node_name = container.name
            # If the image containers the keyword "geth"
            if image.count("geth") > 0:
                # If the container_name contains a keyword
                # append to the list of nodes
                if node_name.count("miner") > 0:
                    nodes["miners"].append(container)
                elif node_name.count("rpc") > 0:
                    nodes["rpcs"].append(container)
                elif node_name.count("boot") > 0:
                    nodes["boots"].append(container)
            # Node dictionary is returned
        return nodes

    def fetchNetworks(self, all=False) -> dict[str, networks.Network | None]:
        """
        This method is responsible for fetching each geth-connected network
        and sorting them by purpose.

        Returns: 
        dict: Dictionary containing each network; {"priv-eth-net", "fork"}
        """
        networks = {"priv-eth-net": None}
        for network in self.networks.list():
            name = str(network.name)
            if name.__eq__("priv-eth-net") == True:
                networks["priv-eth-net"] = network
            if name.count("fork") > 0:
                networks["fork"] = network
        return networks

    def createMiner(self, key: str, port: int, network="priv-eth-net") -> containers.Container:
        miners = self.fetchNodes(all=True)["miners"]
        networks = self.fetchNetworks()
        miner_num = len(miners) + 1
        miner_name = "minerNode" + str(miner_num)
        if network == "fork":
            miner_name += "_fork"
        cmds = ["--mine",
                "--miner.noverify",
                "--unlock "+key,
                "miner.etherbase "+key,
                "--password /root/.ethereum/password.txt",
                "--port "+str(port),
                "--bootnodes " + self.bootnode
                # TODO add nodekey?
                # TODO add netrestrict?
                ]
        args = {
            "name": miner_name,
            "cgroup_parent": "docker-eth-attack",
            "volumes_from": [miners[0].id],
            "ports": {str(port)+"/tcp": port},
            "network": networks[network].name
        }
        return self.containers.run(IMAGE, command=cmds, detach=True, **args)

    def createRpc(self, key: str, port: int, api_port: int, network="priv-eth-net") -> containers.Container:
        rpcs = self.fetchNodes()["rpcs"]
        networks = self.fetchNetworks()
        rpc_num = len(rpcs) + 1
        rpc_name = "rpcNode" + str(rpc_num)
        if network == "fork":
            miner_name += "_fork"
        cmds = ["--allow-insecure-unlock",
                "--http",
                "--http.api admin,debug,web3,eth,txpool,personal,clique,miner,net",
                "--http.addr 0.0.0.0",
                '--http.vhosts "*"',
                "--http.port "+str(api_port),
                "--graphql",
                # TODO Add netrestrict,
                "--ws",
                "--ws.origins '*'",
                "--ws.port "+str(api_port+1),
                "--ws.addr 0.0.0.0",
                '--ws.api "admin,debug,web3,eth,txpool,personal,clique,miner,net"',
                '--syncmode "full"',
                '--gcmode "archive"',
                "--txlookuplimit 0",
                # TODO add nodekey?,
                "--port "+str(port),
                "--bootnodes " + self.bootnode,
                # TODO natextip?
                ]
        ports = {
            str(port)+"/tcp": port,
            str(api_port)+"/tcp": api_port,
            str(api_port+1)+"/tcp": api_port+1
        }
        args = {
            "name": rpc_name,
            "cgroup_parent": "docker-eth-attack",
            "volumes_from": [rpcs[0].id],
            "ports": ports,
            "network": networks[network].name
        }
        return self.containers.run(IMAGE, command=cmds, detach=True, **args)

    def createBootnode(self, key: str, port: int, network="priv-eth-net") -> containers.Container:

        return self.containers.run(IMAGE, detach=True)

    def createForknet(self):
        # TODO create the forked network
        return None

    def exportChain(self):
        return None

    def importChain(self):
        return None

    def fetchNodeConfigs(self):
        nodes = self.fetchNodes()
        dict_names = ["miners", "rpcs", "boots"]
        diction = {}
        for name in dict_names:
            nodelist = nodes[name]
            subdiction = {}
            for node in nodelist:
                subdiction[node.name] = self.apiclient.inspect_container(
                    node.name)
            diction[name] = subdiction
        return diction

    def fetchNodeConfig(self):
        nodes = self.fetchNodes()
        dict_names = ["miners", "rpcs", "boots"]
        diction = {}
        for name in dict_names:
            nodelist = nodes[name]
            subdiction = {}
            for node in nodelist:
                subdiction[node.name] = self.apiclient.inspect_container(
                    node.name)
            diction[name] = subdiction
        return diction

    def fetchPeers(self):
        nodes = self.fetchNodes()
        return_val = {}
        dict_names = ["miners", "rpcs", "boots"]
        config = self.fetchNodeConfigs()
        for name in dict_names:
            nodelist = nodes[name]
            sub_return = {}
            for node in nodelist:
                result = node.exec_run(workdir="/root/.ethereum",
                                       cmd="geth attach /root/.ethereum/geth.ipc --exec 'admin.peers'")
                x = codecs.decode(result.output)
                ip_array = []
                for count in range(x.count("remoteAddress:")):
                    y = x.find("remoteAddress:")
                    ip_array.append(x[y+16:y+31])
                    print(x[y+16:y+31])
                    x = x[y+31:]
                connected_nodes = []
                for ip in ip_array:
                    for name2 in dict_names:
                        for node2 in nodes[name2]:
                            nodeconfig = config[name2][node2.name]["NetworkSettings"][
                                "Networks"]["priv-eth-net"]["IPAMConfig"]["IPv4Address"]
                            if nodeconfig == ip:
                                connected_nodes.append(node2.name)

                sub_return[node.name] = connected_nodes
            return_val[name] = sub_return

        return return_val


"""
This function creates a node with a specified set of commands
"""


def createNode(type: str):

    return None


# createNode("yes")
