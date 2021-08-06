import { animated } from "@react-spring/web";
import { memo } from "react";

const getImage = () => {
	//
	return "locked";
};
// Cell
const Plot = ({ handlePlotClick, cellData, block }) => {
	return (
		<div
			onClick={() => handlePlotClick(block, cellData?.id)}
			className={`cell plot ${(cellData[0] + cellData[1]) % 2 ? "" : "bright"}`}>
			{cellData.seed === 0 ? (
				<img draggable="false" src="./assets/img/locked.png" alt="locked.png" />
			) : cellData.x === 0 && cellData.y === 0 ? (
				<img draggable="false" src="./assets/img/spawn.png" alt="spawn.png" />
			) : (
				<img
					draggable="false"
					src={`./assets/img/${getImage(cellData.seed)}.png`}
					alt="spawn.png"
				/>
			)}
			{/* <h1>{cell.toString()}</h1> */}
		</div>
	);
};

// Cloud
const Cloud = () => {
	return (
		<div className={`cell ${Math.round(Math.random()) ? "bright cloud" : "cloud"}`}>
			<img draggable="false" src="./assets/img/cloud.png" alt="" />
		</div>
	);
};

// Grid Centre Indicator
const CentreCounter = ({ backgroundColor, centreDelta }) => {
	return (
		<animated.span id="centre" style={{ backgroundColor }}>
			<animated.span>{centreDelta}</animated.span>
		</animated.span>
	);
};
const MemoPlot = memo(Plot);
const MemoCloud = memo(Cloud);

export { MemoPlot, MemoCloud, CentreCounter };
