import { createContext } from "react";
import useWeb3 from "../hooks/useWeb3";

const Web3Context = createContext({
	web3: undefined,
	account: undefined,
	toggleWallet: () => {},
});

const Web3ContextProvider = (props) => {
	const { account, provider, providerName, web3, balances, getWeb3ModalProvider } = useWeb3();

	return (
		<Web3Context.Provider
			value={{ account, provider, providerName, balances, web3, getWeb3ModalProvider }}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
