import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8546");

export default web3