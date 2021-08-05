import { animated } from "@react-spring/web";
import React from "react";

const BottomBar = ({ xy, setModal }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X, Y: (<animated.span>{xy}</animated.span>)
			</div>
			<img
				id="teleport"
				src="./assets/img/teleport.png"
				alt="teleport"
				onClick={() => setModal(true)}
			/>
		</div>
	);
};

export default BottomBar;
