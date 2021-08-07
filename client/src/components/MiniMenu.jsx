import { animated } from "@react-spring/web";
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import ImgButton from "./Auxillary/ImgButton";

const MiniMenu = () => {
	const {
		miniMenuStyles: styles,
		selectedBlock,
		closeMiniMenu,
		setIsMiniModal,
	} = useContext(GameContext);
	console.log(selectedBlock);
	return (
		<animated.div className="mini" style={styles}>
			<img className="ring" draggable="false" src="./assets/img/circle.png" alt="circle" />
			<span id="label">
				{selectedBlock?.x},{selectedBlock?.y}
			</span>
			<div className="btns">
				{selectedBlock?.seed === -1 ? (
					<ImgButton
						id="buy"
						dataname="But Land"
						className="buy"
						src="./assets/img/plot-buy-v3.png"
						alt="buy-land-button"
						onClick={setIsMiniModal}
					/>
				) : (
					<ImgButton
						id="sell"
						dataname="Sell Land"
						className="sell"
						src="./assets/img/plot-sell-v3.png"
						alt="buy-land-button"
						onClick={setIsMiniModal}
					/>
				)}
				<ImgButton
					onClick={closeMiniMenu}
					id="exit"
					dataname="Exit Menu"
					className="exit"
					src="./assets/img/plot-rmv-v3.png"
					alt="remove-factory-button"
				/>
				<ImgButton
					id="info"
					dataname="Info"
					className="info"
					src="./assets/img/plot-info-v3.png"
					alt="info-land-button"
					onClick={setIsMiniModal}
				/>
				{!selectedBlock?.factory ? (
					<ImgButton
						id="add"
						dataname="Place Factory"
						className="add"
						src="./assets/img/fact-add.png"
						alt="info-land-button"
						onClick={setIsMiniModal}
						disabled={selectedBlock?.seed === -1}
					/>
				) : (
					<ImgButton
						id="rmv"
						dataname="Remove Factory"
						className="rmv"
						src="./assets/img/fact-destroy.png"
						alt="sell-land-button"
						onClick={setIsMiniModal}
					/>
				)}
			</div>
		</animated.div>
	);
};
export default MiniMenu;
