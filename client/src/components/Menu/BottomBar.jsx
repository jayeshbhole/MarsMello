import { animated } from "@react-spring/web";
import React, { useState } from "react";

const BottomBar = ({ xy, handleTele }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X, Y: (<animated.span>{xy}</animated.span>)
			</div>
			<img id="teleport" src="./assets/img/teleport.png" alt="teleport" onClick={handleTele} />
		</div>
	);
};

export default BottomBar;
