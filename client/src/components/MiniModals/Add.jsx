import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Add = () => {
	const { selectedBlock } = useContext(GameContext);
	return selectedBlock?.factory ? (
		<div className="add-content content">
			<span className="prompt">
				Do you want to place a factory at
				<span className="cords">{`(${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<span className="select">
				<select name="factory" id="factory-list">
					<option value="fact01">Test</option>
				</select>
			</span>
			<button className="place-factory">Place</button>
		</div>
	) : (
		<div className="add-content content">
			<span className="prompt">No Factories in Inventory to place.</span>
			<button>Buy a factory</button>
		</div>
	);
};

export default Add;
