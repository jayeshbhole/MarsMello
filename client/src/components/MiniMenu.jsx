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
					data-name="But Land"
					className="buy"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/>
				{/* <ImgButton
					id="sell"
					data-name="Sell Land"
					className="sell"
					src="./assets/img/plot-sell-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					onClick={closeMiniMenu}
					id="exit"
					data-name="Exit Menu"
					className="exit"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
					// onClick={}
				/>
				{/* <ImgButton
					id="rmv"
					data-name="Remove Factory"
					className="rmv"
					src="./assets/img/plot-rmv-v3.png"
					alt="sell-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					id="info"
					data-name="Info"
					className="info"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={openMini}
				/>
				<ImgButton
					id="add"
					data-name="Place Factory"
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
