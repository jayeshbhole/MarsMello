import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";
import getLandrate from "../../utils/getLandRate";
import LandPreview from "../Auxillary/LandPreview";
import resourceList from "../../utils/resourceList.json";
const Info = () => {
	const { selectedBlock } = useContext(GameContext);
	const { account } = useContext(Web3Context);
	// console.log("selected Block", selectedBlock);
	return selectedBlock?.seed !== -1 ? (
		<div className="info-content content">
			<div className="preview-container">
				<LandPreview cellData={selectedBlock} />
			</div>
			<div className="info">
				Owner {">"}
				{selectedBlock?.owner?.id !== account
					? `${selectedBlock?.owner?.id?.slice(0, 6)}...`
					: " You"}
				<span className="cords ele">
					Co-ordinates {">"}
					<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
				</span>
				<span className="factory ele">
					Factory {"> "}
					{selectedBlock?.factory ? (
						<span>{selectedBlock?.factory?.name}</span>
					) : (
						<span>None</span>
					)}{" "}
				</span>
				<div className="ores ele">
					{Object.keys(resourceList).map((key, _) => {
						return (
							<div key={key}>
								<span className="label">{resourceList[key].name} </span>
								{" -> "}
								{getLandrate(selectedBlock.seed, key)}
							</div>
						);
					})}
				</div>
				{selectedBlock.factory ? (
					<>
						{/* <div className="factory">
							<div className="name">{selectedBlock.factory.name}</div>
						</div> */}
						<div className="produce ele">
							<div className="name">{resourceList[selectedBlock.factory.type].name}</div>
							{getLandrate(selectedBlock.seed, selectedBlock.factory.type)} /hr
						</div>
					</>
				) : null}
			</div>
		</div>
	) : selectedBlock?.x !== 0 && selectedBlock?.y !== 0 ? (
		<div className="info-content content">
			<div className="info">
				<span className="cords">
					Co-ordinates of this Land are{" "}
					<span className="high">{`(${selectedBlock?.x}, ${selectedBlock?.x})`}</span>
				</span>
				<span className="prompt-big ele">Unclaimed Land</span>
				<span className="prompt ele">For Sale</span>
			</div>
		</div>
	) : (
		<div className="info-content content landing">
			<div className="preview-container">
				<LandPreview cellData={selectedBlock} />
			</div>
			<div className="info ele">
				<div className="prompt-big ">MarsMello</div>
				<div className="synopsis ele">
					#BUIDL Industries on a digital and truly decentralised Mars! <br />
					<br />
					Bring Out Your Inner Musk! #BUIDL Industries on a digital and truly decentralised Mars! An
					Idle-Open World-Strategy-Economy-Simulation Game!
				</div>
			</div>
		</div>
	);
};

export default Info;
