// personal.unlockAccount(eth.Accounts[0], "");
//miner.start();
function Simulate() {
  from = Range(1, 10);
  to = Range(1, 10);
  personal.unlockAccount(eth.accounts[from], "");
  eth.sendTransaction({from: eth.accounts[from], to: eth.accounts[to], value: web3.toWei(1, "ether")});
}

//setInterval(Simulate(), 1000);