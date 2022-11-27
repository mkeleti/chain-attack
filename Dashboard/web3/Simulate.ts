import { TransactionConfig } from "web3-eth";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || process.env.NEXT_PUBLIC_WS_SERVER);

const eth_20 = parseInt(web3.utils.toWei("20", "ether"));

async function Transact(): Promise<void> {
  web3.eth.personal.getAccounts().then((accounts) => {
    let length = accounts.length - 0.5;
    let random = () => Math.round(Math.random() * length);
    let txval = Math.random() * eth_20;
    let fromnum = random();
    let tonum = random();
    let tx: TransactionConfig = {
      from: accounts[fromnum],
      to: accounts[tonum],
      value: txval,
    };
    web3.eth.personal.unlockAccount(accounts[fromnum], "password", 5000).then(() => web3.eth.sendTransaction(tx));
    console.log("Transaction sent from " + accounts[fromnum] + " to " + accounts[tonum] + " for " + txval + " ETH");
  });
}

export default function Simulate(): void {
  console.log("simulating");
    setInterval(Transact, 1400);
}

Simulate();