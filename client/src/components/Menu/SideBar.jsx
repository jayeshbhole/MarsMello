import React from "react";
import ImgButton from "../Auxillary/ImgButton";

const SideBar = ({ handleClick, avatar }) => {
	return (
		<div className="sidebar bar">
			<ImgButton
				id="profile"
				dataname="Profile"
				className="profile"
				onClick={(e) => handleClick(e)}
				src={`./assets/avatars/avatars${avatar}.png`}
				alt="Profile Button"
			/>

			<ImgButton
				id="factory"
				dataname="Factory"
				className="factory"
				onClick={(e) => handleClick(e)}
				src="./assets/img/factory.png"
				alt="Factory Button"
			/>

			<ImgButton
				id="resos"
				dataname="Resources"
				className="resos"
				onClick={(e) => handleClick(e)}
				src="./assets/img/miner.png"
				alt="Miner Button"
			/>

			<ImgButton
				id="plots"
				dataname="Plots"
				className="plots"
				onClick={(e) => handleClick(e)}
				src="./assets/img/plots.png"
				alt="Plots Button"
			/>
		</div>
	);
};

export default SideBar;
