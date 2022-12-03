"""
Created by Michael Keleti

This script initiates a 51% attack.
"""
import docker
from docker.models import containers, networks


CLIENT = docker.from_env()  # Docker client used in application
IMAGE = "mkeleti/geth-attack"  # Image to create new containers from
BOOTNODE = '"enode://43974299a4c52b220d8eed430a7ed1479f29548041e3ca67ddc1a4886835878c174d45dfd9e73ebd4901e8071c5bb19003f52e4e408e8ec5ce350f8f74a335a8@255.255.255.242:30301"'  # Primary bootnode address


Container = containers.Container
Network = networks.Network


def fetchNodes() -> dict[str, list[Container]]:
    """
    This method is responsible for fetching each geth node and sorting them by function.

    Returns: 
    dict: Dictionary containing arrays of containers; {"miners", "rpcs", "boots"}
    """
    nodes = {"miners": [], "rpcs": [], "boots": []}
    # Defines node dictionary to return
    for container in CLIENT.containers.list():
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


def fetchNetworks() -> dict[str, Network | None]:
    """
    This method is responsible for fetching each geth-connected network
    and sorting them by purpose.

    Returns: 
    dict: Dictionary containing each network; {"priv-eth-net", "fork"}
    """
    networks = {"priv-eth-net": None}
    for network in CLIENT.networks.list():
        name = str(network.name)
        if name.__eq__("priv-eth-net") == True:
            networks["priv-eth-net"] = network
        if name.count("fork") > 0:
            networks["fork"] = network
    return networks


def createMiner(key: str, port: int, network="priv-eth-net") -> Container:
    miners = fetchNodes()["miners"]
    networks = fetchNetworks()
    miner_num = len(miners) + 1
    miner_name = "minerNode" + str(miner_num)
    cmds = ["--mine",
            "--miner.noverify",
            "--unlock "+key,
            "miner.etherbase "+key,
            "--password /root/.ethereum/password.txt",
            "--port "+str(port),
            "--bootnodes " + BOOTNODE
            ]
    args = {
        "name": miner_name,
        "cgroup_parent": "docker-eth-attack",
        "volumes_from": [miners[0].id],
        "ports": {str(port)+"/tcp": port},
        "network": networks[network]
    }
    return CLIENT.containers.run(IMAGE, detach=True, **args)


def createRpc(containers):

    return CLIENT.containers.run(IMAGE, detach=True)


def createBootnode(containers):

    return CLIENT.containers.run(IMAGE, detach=True)


"""
This function creates a node with a specified set of commands
"""


def createNode(type):
    types = {
        "miner": createMiner(),
        "rpc": createRpc(),
        "boot": createBootnode()
    }

    types.get(type, print("Incorrect type, must be miner, rpc, or boot"))


# createNode("yes")
