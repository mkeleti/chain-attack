import unittest
import attack


class fetchTest(unittest.TestCase):
    def setUp(self):
        self.networks = attack.fetchNetworks()
        self.nodes = attack.fetchNodes()

    def test_priv_eth_net(self):
        """
          Test that priv-eth-net is properly returned.
        """
        return self.assertNotEqual(self.networks["priv-eth-net"], None)

    def test_nodes(self):
        """
          Test that priv-eth-net is properly returned.
        """
        return self.assertNotEqual(self.networks["priv-eth-net"], None)
