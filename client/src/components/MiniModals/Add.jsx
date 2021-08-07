import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";

const Add = () => {
	const { selectedBlock } = useContext(GameContext);
	const { factories } = useContext(Web3Context);
	// console.log("factories", factories);

	return factories ? (
		<div className="add-content content">
			<span className="prompt">
				Choose Factory to place at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<span className="select">
				<select name="factory" id="factory-list">
					<optgroup label="Inventory">
						{factories.map(({ x, y, name }) => {
							if (x === 0 || y === 0 || !x || !y) {
								return <option value={name}>{name}</option>;
							}
						})}
					</optgroup>
					<optgroup label="Teleport">
						{factories.map(({ x, y, name }) => {
							if (x !== 0 || y !== 0 || x || y) {
								return <option value={name}>{name}</option>;
							}
						})}
					</optgroup>
				</select>
			</span>
			<button className="place-factory">Place</button>
		</div>
	) : (
		<div className="add-content content">
			<span className="prompt">No Factories in Inventory to place.</span>
			<button className="buy-fact">Buy a factory</button>
		</div>
	);
};

export default Add;
