import { useState, createContext, useEffect } from "react";
// import useWeb3 from "../hooks/useWeb3";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import gameInterface from "../contracts/MarsmelloGame.json";

const contractAddresses = {
	game: "0x454091B5bb8314a6ab602E28Bd4850B8FC2630F3",
};

const Web3Context = createContext({
	web3: undefined,
	account: undefined,
	getWeb3ModalProvider: () => {},
	disconnectProvider: () => {},
	balances: { mlo: 0, fe: 0, au: 0, ti: 0, cu: 0, al: 0 },
	providerName: "none",
});

const GET_USER = gql`
	query GetBalances($userId: String!) {
		user(id: $userId) {
			mlo
			fe
			al
			cu
			au
			ti
			factories {
				id
			}
			lands {
				id
			}
		}
	}
`;
const GET_LAND = gql`
	query GetLand($x: Int!, $y: Int!) {
		lands(where: { x: $x1, y: $y1 }) {
			id
			x
			y
			owner
			seed
			flows
			factory {
				id
				type
			}
		}
	}
`;

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
	// network: { chainId: 8001, nodeUrl: "https://matic-mumbai.chainstacklabs.com" },
	// network: { chainId: 1377, nodeUrl: "http://127.0.0.1:9545" },
	network: { chainId: 1377, nodeUrl: "http://127.0.0.1:8545" },
	cacheProvider: true,
	providerOptions,
	theme: "dark",
});
const Web3ContextProvider = (props) => {
	const decimals = 18;
	const [provider, setProvider] = useState();
	const [providerName, setProviderName] = useState("None");
	const [gameContract, setGameContract] = useState();
	const [web3, setWeb3] = useState(new Web3());

	const [account, setAccount] = useState();

	// Toggle Modal And Ask for Connection
	const getWeb3ModalProvider = async () => {
		if (provider) {
			if (provider?._portis) provider._portis.showPortis();
		} else {
			const _provider = await web3Modal.connect();
			setWeb3(new Web3(_provider));
			setProvider(_provider);
		}
	};
	const disconnectProvider = () => {
		console.log("Disconnect");
		setAccount(undefined);
		setProvider(undefined);
		setProviderName("None");
		setWeb3(new Web3());
		web3Modal.clearCachedProvider();
	};

	useEffect(() => {
		if (web3.currentProvider)
			(async () => {
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0].toLowerCase());
			})();

		if (!!provider) {
			if (provider?._portis) {
				setProviderName("portis");
				provider._portis.showPortis();
			} else setProviderName("metamask");

			setGameContract(new web3.eth.Contract(gameInterface.abi, contractAddresses.game));

			console.log("provider", provider);
			// Subscribe to accounts change
			provider.on("accountsChanged", async (accounts) => {
				console.log("Provider Listener: Account Change");
				setAccount(accounts[0].toLowerCase());
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
	}, [provider, web3]);

	// Account Changed Hook
	useEffect(() => {
		console.log("changed account", account);
	}, [account]);

	const [loadUserData, { data: userData }] = useLazyQuery(GET_USER, {
		variables: { userId: account },
	});

	useEffect(() => {
		loadUserData({ variables: { userId: account } });
	}, [account]);

	useEffect(() => {
		console.log(userData);
	}, [userData]);
	return (
		<Web3Context.Provider
			value={{
				account,
				provider,
				providerName,
				balances: {
					mlo: userData?.user.mlo,
					fe: userData?.user.fe,
					al: userData?.user.al,
					au: userData?.user.au,
					cu: userData?.user.cu,
					ti: userData?.user.ti,
				},
				getWeb3ModalProvider,
				disconnectProvider,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
