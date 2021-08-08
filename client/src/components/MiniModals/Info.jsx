import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";

const Info = () => {
	const { selectedBlock } = useContext(GameContext);
	const { account } = useContext(Web3Context);

	return selectedBlock?.seed !== -1 ? (
		<div className="info-content content">
			<span className="cords">
				Co-ordinates of this Land are
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.x})`}</span>
			</span>
			<span className="prompt">
				This Land is owned by
				<span className="prompt-big">
					{selectedBlock?.owner?.id !== account
						? `${selectedBlock?.owner?.id?.slice(0, 6)}...`
						: " You"}
				</span>
			</span>
		</div>
	) : (
		<div className="info-content content">
			<span className="cords">
				Co-ordinates of this Land are{" "}
				<span className="high">{`(${selectedBlock?.x}, ${selectedBlock?.x})`}</span>
			</span>
			<span className="prompt-big">Unclaimed Land</span>
			<span className="prompt">For Sale</span>
		</div>
	);
};

export default Info;
