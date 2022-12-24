import unittest
import random
from app.control.control import Control, Client


class controlTest(unittest.TestCase):
    def setUp(self):
        self.control = Control()
        self.networks = self.control.fetchNetworks()
        self.nodes = self.control.fetchNodes()

    def test_priv_eth_net(self):
        """
          Test that priv-eth-net is properly returned.
        """
        return self.assertNotEqual(self.networks["priv-eth-net"], None)

    def test_nodes(self):
        """
          Test that all nodes are accounted for
        """
        for node in self.nodes:
            self.assertGreater(
                len(self.nodes[node]), 0, msg=node+" not found.")

    def test_miner_creation(self):
        """
          Test that a miner can be successfully created
        """
        port = random.randrange(40000, 50000)
        container = self.control.createMiner(
            "0xf30e8252fd22963b15b93ef34324575f4acc437a", port)
        self.assertGreater(
            len(self.control.fetchNodes()["miners"]), 3, msg="Miner not created.")
        container.remove(force=True)

    def test_fetch_peers(self):
        """
          Test that an rpc node can be successfully created
        """
        port = random.randrange(40000, 50000)
        val = self.control.fetchPeers()
        print(val)
        return self.assertDictEqual(self.control.fetchPeers(), "he", msg=val)


class nodeTest(unittest.TestCase):
    def setUp(self):
        self.control = Control()
        self.node
        self.networks = self.control.fetchNetworks()
        self.nodes = self.control.fetchNodes()
