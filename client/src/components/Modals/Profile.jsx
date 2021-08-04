import React, { useContext, useState } from "react";
// profile context
import { Web3Context } from "../../context/Web3Context";
import MiniModal from "../MiniModals/index";

const Profile = ({ avatar, setAvatar }) => {
	const { account, providerName } = useContext(Web3Context);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	return (
		<div className="profile">
			<div className="picture">
				<img src={`./assets/avatars/avatars${avatar}.png`} alt="avatar" />
				<p
					onClick={() => {
						setIsSelectOpen(true);
					}}>
					Change avatar
				</p>
			</div>
			<div className="data">
				<h1>
					<span>Wallet Address </span>
					{`${account ? account?.slice(0, 6) : "0x0000"}...`}
				</h1>
				<h1>
					<span>Wallet Provider</span>
					{providerName}
				</h1>
			</div>
			<button>Change Address</button>
			{isSelectOpen && (
				<MiniModal setIsMiniOpen={setIsSelectOpen}>
					<span>Choose a avatar</span>
					<div className="options">
						<img
							onClick={() => {
								setAvatar(0);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars0.png"
							alt="avatarOne"
						/>
						<img
							onClick={() => {
								setAvatar(1);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars1.png"
							alt="avatarTwo"
						/>
						<img
							onClick={() => {
								setAvatar(2);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars2.png"
							alt="avatarThree"
						/>
						<img
							onClick={() => {
								setAvatar(3);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars3.png"
							alt="avatarFour"
						/>
						<img
							onClick={() => {
								setAvatar(4);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars4.png"
							alt="avatarFive"
						/>
					</div>
				</MiniModal>
			)}
		</div>
	);
};

export default Profile;
