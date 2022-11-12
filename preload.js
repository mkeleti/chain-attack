var coins = web3.toWei("20", "ether")
var coins2 = parseInt(coins);
var count = 0;

function CreateTx() {

}
function Transact() {
    console.log("Transacting");
    count += 1;
    var accounts = personal.listAccounts;
    var length = accounts.length - 0.5;
    function random() { return(Math.round(Math.random() * length)); };
    var txval = Math.random() * coins2;
    var fromnum = random();
    var tonum = random();
    var tx = {
      to: accounts[fromnum],
      from: accounts[tonum],
      value: txval,
      nonce: web3.eth.getTransactionCount(accounts[fromnum]) + txpool.status.pending,
    };
    personal.unlockAccount(accounts[fromnum], "password", 10000);
    personal.sendTransaction(tx, "password");
    console.log("Pending Tx:" + txpool.status.pending + " Queued Tx:" + txpool.status.queued);
}
Transact();
console.log(web3)
