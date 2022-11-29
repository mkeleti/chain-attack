import web3 from "./web3Provider";

export const Subscription = web3.eth.subscribe("newBlockHeaders");
