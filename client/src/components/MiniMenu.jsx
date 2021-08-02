import { animated } from "@react-spring/web";
import React from "react";

const MiniMenu = ({ styles, selectedBlock }) => {
	return (
		<animated.div class="mini" style={styles}>
			<div className="circle">
				<img draggable="false" src="./assets/img/circle.png" alt="circle" />
				<span id="label">{selectedBlock.toString()}</span>
			</div>
		</animated.div>
	);
};
export default MiniMenu;
