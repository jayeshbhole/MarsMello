import React from "react";

const BottomBar = () => {
	return (
		<div className="bottom-bar">
			<div className="x-cord">
				X: <div className="span">{x}</div>
			</div>
			<div className="y-cord">
				Y: <div className="span">{y}</div>
			</div>
		</div>
	);
};

export default BottomBar;
