import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Buy = () => {
	const { selectedBlock } = useContext(GameContext);
	return (
		<div className="buy-content">
			<span className="prompt">
				Do you want to buy land at
				<span className="cords">{`(${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<span className="cost">
				<span className="value">1000</span>
				<span className="token">MLO</span>
			</span>
			<button className="buy-land">Buy</button>
		</div>
	);
};

export default Buy;
