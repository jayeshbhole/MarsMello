import { useState, createContext, useEffect } from "react";
import useWeb3 from "../hooks/useWeb3";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

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

const Web3ContextProvider = (props) => {
	const {
		account,
		provider,
		providerName,
		gameContract,
		web3,
		getWeb3ModalProvider,
		disconnectProvider,
	} = useWeb3();

	const [loadUserData, { data: userData }] = useLazyQuery(GET_USER, {
		variables: { userId: account },
		pollInterval: 60000,
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
