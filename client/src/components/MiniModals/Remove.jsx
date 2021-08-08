import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";

const Remove = ({ setIsOpen }) => {
	const { selectedBlock } = useContext(GameContext);
	const { removeFactory } = useContext(Web3Context);

	return selectedBlock?.factory ? (
		<div className="rmv-content content">
			<span className="prompt">
				Do you want to remove the factory at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span> ?
			</span>
			<button
				onClick={() => {
					removeFactory(selectedBlock?.factory?.id);
					setIsOpen(false);
				}}
				className="rmv-factory">
				Remove
			</button>
		</div>
	) : (
		<div className="rmv-content content">
			<span className="prompt">No Factories in Inventory to place.</span>
			<button className="buy-fact">Buy a factory</button>
		</div>
	);
};

export default Remove;
