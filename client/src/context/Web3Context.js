import { createContext, useEffect, useState, useRef } from "react";
import useWeb3 from "../hooks/useWeb3";
import MarsMelloContract from "../contracts/MarsMello.json";

const Web3Context = createContext({
	web3: undefined,
	account: undefined,
	toggleWallet: () => {},
});

const Web3ContextProvider = (props) => {
	const { account, provider, web3, toggleWallet } = useWeb3();

	return (
		<Web3Context.Provider value={{ account, provider, web3, toggleWallet }}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
