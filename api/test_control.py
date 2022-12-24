import unittest
import random
from app.control.control import Control, Client, Network, CLIENT


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

        """
          Test that a miner can be successfully created
        """
        port = random.randrange(40000, 50000)
        container = self.control.createMiner(
            "0xf30e8252fd22963b15b93ef34324575f4acc437a", port)
        self.assertGreater(
            len(self.control.fetchNodes()["miners"]), 3, msg="Miner not created.")
        container.remove(force=True)

        """
          Test that an rpc node can be successfully created
        """
        port = random.randrange(40000, 50000)
        val = self.control.fetchPeers()
        print(val)
        return self.assertDictEqual(self.control.fetchPeers(), "he", msg=val)


class clientTest(unittest.TestCase):
    def setUp(self):
        self.control = Control()
        self.network = Network()
        self.clients = self.network.clients

    def test_check(self):
        clients = self.network.getClients()
        return self.assertEqual(clients.keys().__len__(), 5, msg=clients.keys())
