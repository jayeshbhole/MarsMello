import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";
import getLandrate from "../../utils/getLandRate";
import LandPreview from "../Auxillary/LandPreview";
import resourceList from "../../utils/resourceList.json";
const Info = () => {
	const { selectedBlock } = useContext(GameContext);
	const { account } = useContext(Web3Context);
	console.log(resourceList);
	return selectedBlock?.seed !== -1 ? (
		<div className="info-content content">
			<div className="preview-container">
				<LandPreview cellData={selectedBlock} />
			</div>
			<div className="info">
				Owner{" "}
				{selectedBlock?.owner?.id !== account
					? `${selectedBlock?.owner?.id?.slice(0, 6)}...`
					: " You"}
				<span className="cords">
					<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
				</span>
				<span className="cords">Factory:</span>
				<div className="ores">
					{Object.keys(resourceList).map((key, _) => {
						return (
							<div key={key}>
								<span className="label">{resourceList[key].name}</span>{" "}
								{getLandrate(selectedBlock.seed, key)}
							</div>
						);
					})}
				</div>
				{selectedBlock.factory ? (
					<>
						<div className="factory">
							<div className="name">{selectedBlock.factory.name}</div>
						</div>
						<div className="produce">
							<div className="-name">{resourceList[selectedBlock.factory.type].name}</div>
							{getLandrate(selectedBlock.seed, selectedBlock.factory.type)} /hr
						</div>
					</>
				) : null}
			</div>
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
