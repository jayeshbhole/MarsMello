import { animated } from "@react-spring/web";
import React, { useState } from "react";

const MiniMenu = ({ styles, selectedBlock }) => {
	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">{selectedBlock.toString()}</span>
			<div className="btns">
				<img
					className="buy btn"
					draggable="false"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
				/>
				<img
					className="exit btn"
					draggable="false"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
				/>
				{/* <img
					className="sell btn"
					draggable="false"
					src="./assets/img/plot-sell-v3.png"
					alt="sell-land-button"
				/> */}
				<img
					className="info btn"
					draggable="false"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
				/>
				<div className="meta btn" />
				<img
					className="add btn"
					draggable="false"
					src="./assets/img/fact-add.png"
					alt="info-land-button"
				/>
			</div>
		</animated.div>
	);
};
export default MiniMenu;
