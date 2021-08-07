import { animated } from "@react-spring/web";
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import ImgButton from "./Auxillary/ImgButton";

const MiniMenu = () => {
	const {
		miniMenuStyles: styles,
		selectedBlock,
		closeMiniMenu,
		setIsMiniOpen,
	} = useContext(GameContext);

	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">
				{selectedBlock?.x},{selectedBlock?.y}
			</span>
			<div className="btns">
				<ImgButton
					id="buy"
					dataname="But Land"
					className="buy"
					src="./assets/img/plot-buy-v3.png"
					alt="buy-land-button"
					onClick={setIsMiniOpen}
				/>
				{/* <ImgButton
					id="sell"
					dataname="Sell Land"
					className="sell"
					src="./assets/img/plot-sell-v3.png"
					alt="buy-land-button"
					onClick={setIsMiniOpen}
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
					onClick={setIsMiniOpen}
				/> */}
				<ImgButton
					id="info"
					dataname="Info"
					className="info"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={setIsMiniOpen}
				/>
				<ImgButton
					id="add"
					dataname="Place Factory"
					className="add"
					src="./assets/img/fact-add.png"
					alt="info-land-button"
					onClick={setIsMiniOpen}
				/>
			</div>
		</animated.div>
	);
};
export default MiniMenu;
