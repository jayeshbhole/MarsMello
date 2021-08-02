import { animated } from "@react-spring/web";
import React from "react";

const BottomBar = ({ xy }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X, Y: (<animated.span>{xy}</animated.span>)
			</div>
		</div>
	);
};

export default BottomBar;
