import React from "react";

const SideBar = ({ handleClick }) => {
	return (
		<div className="sidebar bar">
			<img
				id="profile"
				onClick={(e) => handleClick(e)}
				draggable="false"
				src="./assets/profile.png"
				alt="Profile Button"
			/>

			<img
				id="factory"
				onClick={(e) => handleClick(e)}
				draggable="false"
				src="./assets/factory.png"
				alt="Factory Button"
			/>

			<img
				id="miner"
				onClick={(e) => handleClick(e)}
				draggable="false"
				src="./assets/miner.png"
				alt="Miner Button"
			/>

			<img
				id="plots"
				onClick={(e) => handleClick(e)}
				draggable="false"
				src="./assets/plots.png"
				alt="Plots Button"
			/>
		</div>
	);
};

export default SideBar;
