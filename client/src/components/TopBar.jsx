import React from "react";

const TopBar = ({ factories, miners, plots }) => {
	return (
		<div className="topbar">
			<div className="item factories">
				<h1>{factories}</h1>
				<h3>Factories</h3>
			</div>
			<div className="item miners">
				<h1>{miners}</h1>
				<h3>Miners</h3>
			</div>
			<div className="item plots">
				<h1>{plots}</h1>
				<h3>Plots</h3>
			</div>
			<div className="item misc">
				<h1>0</h1>
				<h3>Misc.</h3>
			</div>
		</div>
	);
};

export default TopBar;
