import { animated } from "@react-spring/web";
import React, { useContext, memo } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";

const Buy = () => {
	const { selectedBlock } = useContext(GameContext);
	const { buyLand, getLandPrice, landPrice } = useContext(Web3Context);
	getLandPrice();
	// console.log(landPrice);
	return (
		<div className="buy-content content">
			<span className="prompt">
				Do you want to buy land at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>?
			</span>
			<span className="cost">
				<animated.span className="value">{landPrice}</animated.span>
				<span className="high">MLO</span>
			</span>
			<button className="buy-land" onClick={() => buyLand(selectedBlock.x, selectedBlock.y)}>
				Buy
			</button>
		</div>
	);
};

export default memo(Buy);
