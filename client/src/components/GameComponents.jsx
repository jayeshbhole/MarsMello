import { animated } from "@react-spring/web";
import { memo } from "react";

const getImage = (cellData) => {
	//
	if (cellData.x === 0 && cellData.y === 0) return "spawn";
	if (cellData.seed === -1) return "locked";
	const mod = cellData.seed % 100;
	if (mod > 90) return `pixplot_4`;
	if (mod > 80) return `pixplot_3`;
	if (mod > 60) return `pixplot_2`;
	if (mod > 30) return `pixplot_1`;
	return `pixplot_0`;
};
// Cell
const Plot = ({ handlePlotClick, owned, cellData }) => {
	const image = getImage(cellData);
	let seed = cellData.seed.toString();
	return (
		<div
			onClick={() => handlePlotClick(cellData)}
			className={`cell plot ${(cellData.x + cellData.y) % 2 ? "" : "bright"} owned-${owned}`}>
			<img draggable="false" src={`./assets/img/${image}.png`} alt={`${image}.png`} />
			{cellData?.factory ? (
				<img
					draggable="false"
					className="factory"
					style={{ top: `${seed[1]}%`, left: `${seed[0]}%` }}
					src={`./assets/img/factories/factory_${cellData.factory.type}.gif`}
					alt={`${"factory"}.png`}
				/>
			) : null}
			{/* <h1>{cellData?.owner?.id}</h1> */}
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
