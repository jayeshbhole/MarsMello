import { animated } from "@react-spring/web";
import { memo } from "react";

const getImage = (cellData) => {
	//
	if (cellData.x === 0 && cellData.y === 0) return "spawn";
	if (cellData.seed === -1) return "locked";

	return `pixplot_${parseInt(cellData.seed) % 5}`;
};
// Cell
const Plot = ({ handlePlotClick, cellData, block }) => {
	const image = getImage(cellData);
	return (
		<div
			onClick={() => handlePlotClick(cellData)}
			className={`cell plot ${
				(cellData.x + cellData.y) % 2 ? "" : "bright"
			} owned-${!!cellData.owned}`}>
			<img draggable="false" src={`./assets/img/${image}.png`} alt={`${image}.png`} />

			{/* <h1>{[cellData.x, cellData.y].toString()}</h1> */}
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
