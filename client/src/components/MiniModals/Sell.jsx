import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Sell = () => {
	const { selectedBlock } = useContext(GameContext);
	return (
		<div className="sell-content content">
			<span className="prompt">
				Do you want to sell land at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span> ?
			</span>
			<span className="cost">
				<span className="value">1000</span>
				<span className="high">MLO</span>
			</span>
			<button className="sell-land">Sell</button>
		</div>
	);
};

export default Sell;
