import React from "react";
// profile context

const Profile = () => {
	return (
		<div className="profile">
			<div className="picture">
				<img src="./assets/profile.png" alt="" />
				<p>Change avatar</p>
			</div>
			<div className="data">
				<h1>
					<span>Wallet Address </span> 0xBf61E1a7F698b2E68cBc6BE51E9784Ce7ccc0B1F
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
