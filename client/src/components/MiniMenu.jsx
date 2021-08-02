import { animated } from "@react-spring/web";
import React, { useState } from "react";

const MiniMenu = ({ styles, selectedBlock, OpenMini }) => {
	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">{selectedBlock.toString()}</span>
			<div className="btns">
				<img
					id="buy"
					className="btn"
					draggable="false"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
					onClick={OpenMini}
				/>
				{/* <img
					id="sell"
					className="btn"
					draggable="false"
					src="./assets/img/plot-sell-v3.png"
					alt="buy-land-button"
					onClick={OpenMini}
				/> */}
				<img
					id="exit"
					className="btn"
					draggable="false"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
					// onClick={}
				/>
				{/* <img
					id="rmv"
					className="btn"
					draggable="false"
					src="./assets/img/plot-rmv-v3.png"
					alt="sell-land-button"
					onClick={OpenMini}
				/> */}
				<img
					id="info"
					className="btn"
					draggable="false"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={OpenMini}
				/>
				<div className="meta btn" />
				<img
					id="add"
					className="btn"
					draggable="false"
					src="./assets/img/fact-add.png"
					alt="info-land-button"
					onClick={OpenMini}
				/>
			</div>
		</animated.div>
	);
};
export default MiniMenu;
