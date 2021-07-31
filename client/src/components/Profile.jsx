import React from "react";
// profile context

const Profile = () => {
	return (
		<div className="profile">
			<div className="picture">
				<img src="./assets/profile.png" alt="" /> <p>0xBf61E1a7F698b2E68cBc6BE51E9784Ce7ccc0B1F</p>
			</div>
			<div className="data">
				<h1>
					<span>Name </span> Elon Musk
				</h1>
				<h1>
					<span>Username </span>NotAlien
				</h1>
				<h1>
					<span>Date Joined </span>31 July, 2021
				</h1>
			</div>
		</div>
	);
};

export default Profile;
