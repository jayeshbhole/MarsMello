import React from "react";

const BottomBar = ({ x, y }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X: <span>{x}</span>
			</div>
			<div className="y-cord cords">
				Y: <span>{y}</span>
			</div>
		</div>
	);
};

export default BottomBar;
