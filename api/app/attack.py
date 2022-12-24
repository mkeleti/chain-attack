from control.control import Control

CONTROL = Control()

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
