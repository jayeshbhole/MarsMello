import Portis from "@portis/web3";
// import { createContext, useState } from "react";
import Web3 from "web3";

const portis = new Portis("4d7e97a1-076d-46e5-b777-d0c5b92d000f", {
	nodeUrl: "http://localhost:7545",
	chainId: "5777",
});
const web3 = new Web3(portis.provider);
// const marsMelloContract = 0xfaa97d7fbd566cb5455ab6ec4448eaeb05fa984d;

console.log(web3);
// const Web3Context = createContext({

// })
// const Web3ContextProvider = ()=>{

// }

export default web3;
