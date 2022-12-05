var coins = web3.toWei("20", "ether");
var coins2 = parseInt(coins);
var count = 0;

// Filename must be string, sets name of file to store in ./blockchain/blockchain-data/backups
function backup(filename) {
  var name = "/root/backups/" + filename;
  console.log("Backing up chain to: " + filename);
  admin.exportChain(name);
}

// Lim controls at what point blocks should be backed up.
function whileBackup(lim) {
  while (true) {
    var blocknum = eth.blockNumber;
    blocknum += 1;
    console.log("Current Block: " + eth.blockNumber);
    if (eth.blockNumber >= lim) {
      backup(blocknum);
      break;
    }
    admin.sleepBlocks(1);
  }
}
// whileBackup(950);
// whileBackup(1000);
whileBackup(3);
whileBackup(6);
//admin.importChain(5);

//console.log(web3.debug.printBlock(5));
//console.log(web3.toUtf8(web3.toString(0xc000db2e80)));
/**
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
**/
