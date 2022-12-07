from app import node_control
import docker

CONTROL = node_control.Control()

"""
1. Create new docker network
2. Backup network to /backups folder
3. Remove two miners from network
4. Recreate the two miners that were on the network except on "fork-net" and connected to eachother, using import of blockchain.
5. Send transactions between miners
6. Wait for the blockheight to reach past the blockheight of older chain.
7. Switch miners back to new network.
8. Voila
"""


"""
1. If time permits
"""

client = docker.from_env()
control = node_control.Control()


def attack():
    network = client.networks.create(
        "fork", driver="bridge")  # Create fork network
    nodes = control.fetchNodes()  # Fetch nodes
    configs = control.fetchNodeConfig()  # Fetch node configs
    nodes["rpcs"][0].exec_run(
        "geth attach /root/.ethereum/geth.ipc --exec 'admin.exportChain(""\"/root/backups/backup\")'")  # Create Backup
    # nodes["miners"][0].remove(force=True)
    # nodes["miners"][1].remove(force=True)
    # miner3 = control.createMiner("0x3bcf84dd3ee4c8e3d99bdf37a6ce32a7562c93bf", 30305, "miner3", "fork")
    # miner2 = control.createMiner("0xe1f5c19a40c4cc55dd5b98116a05d342da9064b3", 30306, "miner2", "fork")

    #control.createRpc("rpc1", "rpc1", "fork", 8545, 8545, 8545)

    return nodes["rpcs"][0].attrs
