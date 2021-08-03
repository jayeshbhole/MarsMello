import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

const useWeb3 = () => {
	const balances = [];
	const providerOptions = {
		portis: {
			package: Portis,
			options: {
				id: "4d7e97a1-076d-46e5-b777-d0c5b92d000f", // Portis DAPP ID
				infuraId: "006a04f7400849fb8689353c7da198a0",
			},
		},
	};
	const web3Modal = new Web3Modal({
		// network: "mainnet",
		network: { chainId: 8001, nodeUrl: "https://matic-mumbai.chainstacklabs.com" },
		cacheProvider: false,
		providerOptions,
		theme: "dark",
	});

	const [account, setAccount] = useState();
	const [provider, setProvider] = useState();
	const web3 = useRef(new Web3());

	const toggleWallet = async () => {
		if (account) {
			if (provider?._portis) provider._portis.showPortis();
		} else {
			const _provider = await web3Modal.connect();
			web3.current = new Web3(_provider);
			setProvider(_provider);

			const accounts = await web3.current.eth.getAccounts();
			setAccount(accounts[0]);
		}
	};

	useEffect(() => {
		console.log(provider?._portis);
	}, []);

	// Account Changed Hook
	useEffect(() => {
		console.log("Account Changed Hook", account);
	}, [account]);

	useEffect(() => {
		if (!!provider) {
			console.log("provider", provider);

			// Subscribe to accounts change
			provider.on("accountsChanged", async (accounts) => {
				console.log("Provider Listener: Account Change", accounts);
				setAccount(accounts[0]);
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log("Provider Listener: Chain Change", chainId);
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log("Provider Listener: Connected", info);
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("Provider Listener: Disconnect", error);
				setAccount([]);
			});
		}
	}, [provider]);

	return { web3, provider, account, balances, toggleWallet };
};

export default useWeb3;
