import { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import mloInterface from "../contracts/MarsMello.json";
import ironInterface from "../contracts/Iron.json";
import goldInterface from "../contracts/Gold.json";
import titaniumInterface from "../contracts/Titanium.json";
import copperInterface from "../contracts/Copper.json";
import aluminiumInterface from "../contracts/Aluminium.json";

const contractAddresses = {
	MLO: "0xD031d08B536FdB33004227b645b0FCda2c37A825",
	FE: "0x18e6675C49fc3ceF6c6eFE54C5C91021dE1F1485",
	AU: "0xC98984bdcb6feC081e0b0aba7104e7817Ead40A9",
	TI: "0x9a21Fc5BA9D3BC66d761E8240aAA9cfcc4d5841F",
	CU: "0x0b07167AC158A83DABD05AF3b3942B87679AACD1",
	AL: "0x58Fb06Fdf8c97bD7937005493b97c3d14A5dc639",
};

const useWeb3 = () => {
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
		cacheProvider: true,
		providerOptions,
		theme: "dark",
	});

	const [account, setAccount] = useState();
	const [balances, setBalances] = useState({ MLO: 0, FE: 0, AU: 0, TI: 0, CU: 0, AL: 0 });
	const [provider, setProvider] = useState();
	const [providerName, setProviderName] = useState();
	const [contracts, setContracts] = useState({
		marsMelloContract: {},
		ironContract: {},
		goldContract: {},
		titaniumContract: {},
		copperContract: {},
		aluminiumContract: {},
	});

	const [web3, setWeb3] = useState(new Web3());
	const decimals = 18;

	// Toggle Modal And Ask for Connection
	const getWeb3ModalProvider = async () => {
		if (account) {
			if (provider?._portis) provider._portis.showPortis();
		} else {
			const _provider = await web3Modal.connect();
			setWeb3(new Web3(_provider));
			setProvider(_provider);
		}
	};

	const getBalances = async () => {
		if (account) {
			const newBal = {};
			await contracts.marsMelloContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.MLO = balance / 10 ** decimals));
			await contracts.ironContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.FE = balance / 10 ** decimals));
			await contracts.goldContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.AU = balance / 10 ** decimals));
			await contracts.titaniumContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.TI = balance / 10 ** decimals));
			await contracts.copperContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.CU = balance / 10 ** decimals));
			await contracts.aluminiumContract.methods
				.balanceOf(account)
				.call()
				.then((balance) => (newBal.AL = balance / 10 ** decimals));

			return newBal;
		}
	};

	useEffect(() => {
		if (provider?._portis) {
			setProviderName("portis");
			provider._portis.showPortis();
		} else setProviderName("metamask");

		if (!!provider) {
			setContracts({
				marsMelloContract: new web3.eth.Contract(mloInterface.abi, contractAddresses.MLO),
				ironContract: new web3.eth.Contract(ironInterface.abi, contractAddresses.FE),
				goldContract: new web3.eth.Contract(goldInterface.abi, contractAddresses.AU),
				titaniumContract: new web3.eth.Contract(titaniumInterface.abi, contractAddresses.TI),
				copperContract: new web3.eth.Contract(copperInterface.abi, contractAddresses.CU),
				aluminiumContract: new web3.eth.Contract(aluminiumInterface.abi, contractAddresses.AL),
			});
			(async () => {
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0]);
			})();

			console.log("provider", provider);

			// Subscribe to accounts change
			provider.on("accountsChanged", async (accounts) => {
				console.log("Provider Listener: Account Change");
				setAccount(accounts[0]);
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log("Provider Listener: Chain Change", chainId);
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log("Provider Listener: Connected");
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("Provider Listener: Disconnect", error);
				setAccount([]);
			});
		}
	}, [provider, web3.eth]);

	// Account Changed Hook
	useEffect(() => {
		if (account)
			(async () => {
				setBalances(await getBalances());
			})();
	}, [account]);

	// Changed Balances
	useEffect(() => {
		console.log("account", account);
		console.log("Balances", balances);
	}, [balances]);

	return { web3, provider, account, balances, providerName, contracts, getWeb3ModalProvider };
};

export default useWeb3;
