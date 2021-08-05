import { animated } from "@react-spring/web";
import React from "react";

const BottomBar = ({ xy, teleport }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X, Y: (<animated.span>{xy}</animated.span>)
			</div>
			<img
				id="teleport"
				src="./assets/img/teleport.png"
				alt="teleport"
				onClick={() => teleport(0, 0)}
			/>
		</div>
	);
};

export default BottomBar;
