import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Info = () => {
	const { selectedBlock } = useContext(GameContext);
	return selectedBlock ? (
		<div className="info">
			<span>This Land is owned by {/*userID*/}</span>
			<span>This Land has {/*factoryCount*/} Factories.</span>
		</div>
	) : (
		<div className="info">
			<span>Locked.</span>
			<span>For Sale</span>
		</div>
	);
};

export default Info;
