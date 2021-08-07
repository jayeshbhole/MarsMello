import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Remove = () => {
	const { selectedBlock } = useContext(GameContext);
	return selectedBlock?.factory ? (
		<div className="rmv-content content">
			<span className="prompt">
				Do you want to remove the factory at
				<span className="cords">{`(${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<span className="select">
				<select name="factory" id="factory-list">
					<option value="fact01">Test</option>
				</select>
			</span>
			<button className="rmv-factory">Remove</button>
		</div>
	) : (
		<div className="rmv-content content">
			<span className="prompt">No Factories in Inventory to place.</span>
			<button>Buy a factory</button>
		</div>
	);
};

export default Remove;
