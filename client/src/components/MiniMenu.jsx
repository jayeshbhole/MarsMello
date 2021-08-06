import { animated } from "@react-spring/web";
import React, { useState } from "react";
import ImgButton from "./Auxillary/ImgButton";

const MiniMenu = ({ styles, selectedBlock, miniMenuApi, openMini }) => {
	const closeMiniMenu = () => {
		miniMenuApi.set({
			display: "none",
		});
	};
	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">{selectedBlock.toString()}</span>
			<div className="btns">
				<ImgButton
					id="buy"
					className="buy"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/>
				{/* <ImgButton
					id="sell"
					className="sell"
					src="./assets/img/plot-sell-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					onClick={closeMiniMenu}
					id="exit"
					className="exit"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
					// onClick={}
				/>
				{/* <ImgButton
					id="rmv"
					className="rmv"
					src="./assets/img/plot-rmv-v3.png"
					alt="sell-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					id="info"
					className="info"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={openMini}
				/>
				<ImgButton
					id="add"
					className="add"
					src="./assets/img/fact-add.png"
					alt="info-land-button"
					onClick={openMini}
				/>
			</div>
		</animated.div>
	);
};
export default MiniMenu;
