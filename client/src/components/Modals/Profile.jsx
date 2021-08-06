import React, { useContext, useState } from "react";
// profile context
import { Web3Context } from "../../context/Web3Context";
import MiniModal from "../MiniModals/index";
import ImgButton from "../Auxillary/ImgButton";

const Profile = ({ avatar, setAvatar }) => {
	const { account, providerName, disconnectProvider } = useContext(Web3Context);
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
			<div className="btns">
				<button className="dc" onClick={() => disconnectProvider()}>
					Disconnect Wallet
				</button>
				<button className="change">
					Change <br />
					Wallet
				</button>
			</div>
			{isSelectOpen && (
				<MiniModal setIsMiniOpen={setIsSelectOpen}>
					<span>Choose a avatar</span>
					<div className="options">
						<ImgButton
							data-name="Satoshi"
							className="hover-info"
							onClick={() => {
								setAvatar(0);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars0.png"
							alt="avatarOne"
						/>
						<ImgButton
							data-name="Jeff"
							className="hover-info"
							onClick={() => {
								setAvatar(1);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars1.png"
							alt="avatarTwo"
						/>
						<ImgButton
							data-name="Biju"
							className="hover-info"
							onClick={() => {
								setAvatar(2);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars2.png"
							alt="avatarThree"
						/>
						<ImgButton
							data-name="Vitalik"
							className="hover-info"
							onClick={() => {
								setAvatar(3);
								setIsSelectOpen(false);
							}}
							src="./assets/avatars/avatars3.png"
							alt="avatarFour"
						/>
						<ImgButton
							data-name="Elon"
							className="hover-info"
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
