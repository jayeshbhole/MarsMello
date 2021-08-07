import { animated } from "@react-spring/web";
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import ImgButton from "./Auxillary/ImgButton";

const MiniMenu = () => {
	const {
		miniMenuStyles: styles,
		cellSize,
		selectedBlock,
		miniMenuApi,
		openMini,
	} = useContext(GameContext);

	const closeMiniMenu = () => {
		miniMenuApi.set({
			display: "none",
			top: -2 * cellSize,
			left: -2 * cellSize,
		});
	};
	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">{selectedBlock.toString()}</span>
			<div className="btns">
				<ImgButton
					id="buy"
					dataname="But Land"
					className="buy"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/>
				{/* <ImgButton
					id="sell"
					dataname="Sell Land"
					className="sell"
					src="./assets/img/plot-sell-v3.png"
					alt="buy-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					onClick={closeMiniMenu}
					id="exit"
					dataname="Exit Menu"
					className="exit"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
					// onClick={}
				/>
				{/* <ImgButton
					id="rmv"
					dataname="Remove Factory"
					className="rmv"
					src="./assets/img/plot-rmv-v3.png"
					alt="sell-land-button"
					onClick={openMini}
				/> */}
				<ImgButton
					id="info"
					dataname="Info"
					className="info"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={openMini}
				/>
				<ImgButton
					id="add"
					dataname="Place Factory"
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
