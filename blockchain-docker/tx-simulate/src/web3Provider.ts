import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://host.docker.internal:8546");

export default web3