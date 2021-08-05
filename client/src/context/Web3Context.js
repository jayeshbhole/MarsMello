import { createContext } from "react";
import useWeb3 from "../hooks/useWeb3";

const Web3Context = createContext({
	web3: undefined,
	account: undefined,
	getWeb3ModalProvider: () => {},
	disconnectProvider: () => {},
	balances: { MLO: 0, FE: 0, AU: 0, TI: 0, CU: 0, AL: 0 },
	providerName: "none",
});

const Web3ContextProvider = (props) => {
	const {
		account,
		provider,
		providerName,
		web3,
		balances,
		getWeb3ModalProvider,
		disconnectProvider,
	} = useWeb3();

	return (
		<Web3Context.Provider
			value={{
				account,
				provider,
				providerName,
				balances,
				web3,
				getWeb3ModalProvider,
				disconnectProvider,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
