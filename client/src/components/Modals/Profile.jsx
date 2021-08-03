import React, { useContext } from "react";
// profile context
import { Web3Context } from "../../context/Web3Context";

const Profile = () => {
	const { account, toggleWallet } = useContext(Web3Context);

	return (
		<div className="profile">
			<div className="picture">
				<img src="./assets/img/profile.png" alt="" />
				<p>Change avatar</p>
			</div>
			<div className="data">
				<h1>
					<span>Wallet Address </span> {account}
				</h1>
				<h1>
					<span>Wallet Provider</span>Portis
				</h1>
			</div>
			<button>Change Address</button>
		</div>
	);
};

export default Profile;
