import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Info = () => {
	const { selectedBlock } = useContext(GameContext);
	return selectedBlock?.seed !== -1 ? (
		<div className="info">
			<span>Cords. of Land are {selectedBlock?.id}</span>
			<span>This Land is owned by {selectedBlock?.owner.id}</span>
		</div>
	) : (
		<div className="info">
			<span>Locked.</span>
			<span>For Sale</span>
		</div>
	);
};

export default Info;
