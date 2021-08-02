import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

const providerOptions = {
	/* See Provider Options Section */
	portis: {
		package: Portis, // required
		options: {
			id: "4d7e97a1-076d-46e5-b777-d0c5b92d000f", // required
			network: "maticMumbai",
		},
	},
};

const web3Modal = new Web3Modal({
	network: "maticMumbai", // optional
	cacheProvider: true, // optional
	providerOptions, // required
});

const Web3Context = createContext({ web3: undefined, account: undefined });

const Web3ContextProvider = (props) => {
	const [account, setAccount] = useState("");
	const [provider, setProvider] = useState();

	const logOut = () => {};

	useEffect(() => {
		(async () => {
			const provider = await web3Modal.connect();
			const web3 = new Web3(provider);
			setProvider(provider);
			web3?.eth.getAccounts().then((account) => setAccount(account));
		})();
	}, []);
	useEffect(() => {
		console.log(account);
	}, [account]);

	useEffect(() => {
		if (provider) {
			// Subscribe to accounts change
			provider.on("accountsChanged", (accounts) => {
				console.log(accounts);
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log(chainId);
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log(info);
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log(error);
				setAccount([]);
			});
		}
	}, [provider]);

	return (
		<Web3Context.Provider value={{ account, provider, logOut }}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
