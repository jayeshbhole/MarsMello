import React from "react";
import Profile from "../assets/profile.png";
import Factory from "../assets/factory.png";
import Miner from "../assets/miner.png";
import Plots from "../assets/plots.png";

const SideBar = () => {
	<div className="sidebar">
		<button>
			<img src={Profile} alt="Profile Button" />
		</button>
		<button>
			<img src={Factory} alt="Factory Button" />
		</button>
		<button>
			<img src={Miner} alt="Miner Button" />
		</button>
		<button>
			<img src={Plots} alt="Plots Button" />
		</button>
	</div>;
};

export default SideBar;
