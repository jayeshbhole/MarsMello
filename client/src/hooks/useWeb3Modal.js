// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useMemo, useState } from "react";
import Portis from "@portis/web3";
import Web3Modal from "web3modal";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "006a04f7400849fb8689353c7da198a0";

const NETWORK_NAME = "Matic Mumbai";

function useWeb3Modal(config = {}) {
	const [provider, setProvider] = useState();
	const [autoLoaded, setAutoLoaded] = useState(false);
	const [signedInAddress, setSignedInAddress] = useState("");
	// const [roles, setRoles] = useState([]);
	const [limitedMode, setLimitedMode] = useState(null);
	const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;

	// Web3Modal also supports many other wallets.
	// You can see other options at https://github.com/Web3Modal/web3modal
	const web3Modal = useMemo(
		() =>
			new Web3Modal({
				network: NETWORK,
				cacheProvider: true,
				providerOptions: {
					portis: {
						package: Portis, // required
						options: {
							id: "4d7e97a1-076d-46e5-b777-d0c5b92d000f", // required
						},
						infuraId: infuraId,
					},
				},
				theme: "dark",
			}),
		[]
	);

	// Open wallet selection modal.
	const loadWeb3Modal = useCallback(async () => {
		const newProvider = await web3Modal.connect();
		setProvider(new Portis(newProvider));
		setSignedInAddress(newProvider.selectedAddress);
	}, [web3Modal]);

	const logoutOfWeb3Modal = useCallback(
		async function () {
			setSignedInAddress("");
			await web3Modal.clearCachedProvider();
			window.location.reload();
		},
		[web3Modal]
	);

	// If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
	useEffect(() => {
		if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
			loadWeb3Modal();
			setAutoLoaded(true);
		}
	}, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

	useEffect(() => {
		async function fetchRoles() {
			return;
			// setRoles(await getRoles(provider, signedInAddress));
		}
		async function fetchLimitedMode() {
			return;
			// setLimitedMode(await getLimitedMode(provider));
		}

		fetchRoles();
		fetchLimitedMode();
	}, [provider, signedInAddress]);

	return [provider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress, limitedMode];
}

export default useWeb3Modal;
