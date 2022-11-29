import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || process.env.NEXT_PUBLIC_WS_SERVER);

export default web3;
