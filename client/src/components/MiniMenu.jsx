import { animated } from "@react-spring/web";
import React, { memo, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { Web3Context } from "../context/Web3Context";
import ImgButton from "./Auxillary/ImgButton";

const MiniMenu = ({ setModalType, setIsModalOpen }) => {
	const { miniMenuStyles: styles, selectedBlock, closeMiniMenu } = useContext(GameContext);
	const { account } = useContext(Web3Context);

	const handleClick = (e) => {
		setModalType(e.target.id);
		setIsModalOpen(true);
	};
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
						dataname="Buy Land"
						className="buy"
						src="./assets/img/plot-buy-v3.png"
						alt="buy-land-button"
						onClick={handleClick}
						disabled={selectedBlock?.x === 0 && selectedBlock?.y === 0}
					/>
				) : (
					<ImgButton
						id="sell"
						dataname="Transfer Land"
						className="sell"
						src="./assets/img/plot-sell-v3.png"
						alt="buy-land-button"
						onClick={handleClick}
						disabled={selectedBlock?.owner?.id !== account}
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
					onClick={handleClick}
				/>
				{!selectedBlock?.factory ? (
					<ImgButton
						id="add"
						dataname="Place Factory"
						className="add"
						src="./assets/img/fact-add.png"
						alt="info-land-button"
						onClick={handleClick}
						disabled={selectedBlock?.seed === -1 || selectedBlock?.owner?.id !== account}
					/>
				) : (
					<ImgButton
						id="rmv"
						dataname="Remove Factory"
						className="rmv"
						src="./assets/img/fact-destroy.png"
						alt="sell-land-button"
						onClick={handleClick}
					/>
				)}
			</div>
		</animated.div>
	);
};
const MemoMiniMenu = memo(MiniMenu);
export default MemoMiniMenu;
