import React from "react";

const SideBar = () => {
	return (
		<div className="sidebar bar">
			<button>
				<img draggable="false" src="./assets/profile.png" alt="Profile Button" />
			</button>
			<button>
				<img draggable="false" src="./assets/factory.png" alt="Factory Button" />
			</button>
			<button>
				<img draggable="false" src="./assets/miner.png" alt="Miner Button" />
			</button>
			<button>
				<img draggable="false" src="./assets/plots.png" alt="Plots Button" />
			</button>
		</div>
	);
};

export default SideBar;
