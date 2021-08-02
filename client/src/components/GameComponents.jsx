import { animated } from "@react-spring/web";

// Cell
const Plot = ({ handlePlotClick, cell }) => {
	return (
		<div
			onClick={() => handlePlotClick(cell, cell?.id)}
			className={`cell plot ${(cell[0] + cell[1]) % 2 ? "" : "bright"}`}>
			{!(cell[0] || cell[1]) ? (
				<img draggable="false" src="./assets/img/spawn.png" alt="spawn.png" />
			) : (
				<img draggable="false" src="./assets/img/locked.png" alt="locked.png" />
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

export { Plot, Cloud, CentreCounter };
