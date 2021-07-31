import { useState, useEffect } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, config } from "@react-spring/web";
import Menu from "./components/Menu";
// import web3 from "./context/web3Context";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const calculateGrid = (hk, chunkCentre) => {
	return Array.from({ length: 31 }, (_, y) => {
		if (y < 5 || y >= 26) return Array.from({ length: 31 }, () => [1]);
		return Array.from({ length: 31 }, (_, x) => {
			if (x < 5 || x >= 26) return [1];
			return [x - hk[0] + chunkCentre[0], -y + hk[1] + chunkCentre[1]];
		});
	});
};

const App = () => {
	const hk = [15, 15];
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const cellSize = Math.max(windowWidth, windowHeight) / 10;
	const gridSize = cellSize * 31;
	const paddingSize = cellSize * 5;
	const centredGridOffsets = [-((gridSize - windowHeight) / 2), -((gridSize - windowWidth) / 2)];

	const localTop = parseFloat(localStorage.getItem("top")) || centredGridOffsets[0];
	const localLeft = parseFloat(localStorage.getItem("left")) || centredGridOffsets[1];
	// The centre of window in the grid
	const localCentreDelta = localStorage
		.getItem("centreDelta")
		?.split(",")
		.map((v, _) => parseInt(v)) || [0, 0];

	// Centre of the loaded chunk
	const [chunkCentre, setChunkCentre] = useState(
		localStorage
			.getItem("chunkCentre")
			?.split(",")
			.map((v) => parseInt(v)) || [0, 0]
	);
	const [rows, setRows] = useState(calculateGrid(hk, chunkCentre));
	const [loading, setLoading] = useState(false);

	// Utility Functions
	const calculateCentre = (top, left) => {
		return [
			Math.floor((-left - paddingSize + windowWidth / 2) / cellSize) - 10,
			-Math.floor((-top - paddingSize + windowHeight / 2) / cellSize) + 10,
		];
	};
	const isOutOfBounds = (top, left) => {
		const padding = 0.7 * paddingSize;
		if (-top < padding || -top > gridSize - padding - windowHeight) return true;
		if (-left < padding || -left > gridSize - padding - windowWidth) return true;
		return false;
	};

	useEffect(() => {
		console.log({ windowHeight, windowWidth, gridSize, centredGridOffsets });
	}, []);
	useEffect(() => {
		localStorage.setItem("chunkCentre", chunkCentre);
		setRows(calculateGrid(hk, chunkCentre));
	}, [chunkCentre]);

	// Springy
	const [{ top, left, centreDelta, backgroundColor, xy }, centreApi] = useSpring(() => ({
		top: localTop,
		left: localLeft,
		centreDelta: localCentreDelta,
		xy: [chunkCentre[0] + localCentreDelta[1], chunkCentre[1] + localCentreDelta[1]],
		backgroundColor: "white",
		config: config.slow,
	}));
	const dragBind = useDrag(
		({ movement: [mx, my], tap, last }) => {
			if (loading) return;

			if (tap) {
				centreApi.stop();
				calculateCentre(top.goal, left.goal);
				return;
			} else if (last) {
				handleDragEnd(top.goal, left.goal);
				return;
			}

			centreApi.start({
				top: my,
				left: mx,
			});
			const newCentreDelta = calculateCentre(top.goal, left.goal);
			centreApi.set({
				centreDelta: newCentreDelta,
				xy: [chunkCentre[0] + newCentreDelta[0], chunkCentre[1] + newCentreDelta[1]],
				backgroundColor: isOutOfBounds(top.goal, left.goal) ? "red" : "white",
			});
		},
		{ initial: () => [left.get(), top.get()] }
	);

	// Player Movements
	const handleDragEnd = (draggedTop, draggedLeft) => {
		if (isOutOfBounds(draggedTop, draggedLeft)) {
			(async function () {
				const newCentreDelta = calculateCentre(draggedTop, draggedLeft);
				// Displacement of current centred block from the window centre
				const displacement = [
					(draggedTop - centredGridOffsets[0]) % cellSize,
					(draggedLeft - centredGridOffsets[1]) % cellSize,
				];
				const newOffsets = [
					centredGridOffsets[0] - displacement[0],
					centredGridOffsets[1] - displacement[1],
				];
				const reducedNewCentreDelta = calculateCentre(...newOffsets);
				console.log(displacement, newOffsets, reducedNewCentreDelta);
				// Stall the dragging
				while (true) {
					setLoading(true);
					if (!top.idle || !left.idle) await sleep(500);
					else break;
				}

				// Set the chunk centre to the block at the centre of the screen
				setChunkCentre((curChunkCentre) => {
					const newChunkCentre = [
						newCentreDelta[0] + curChunkCentre[0],
						newCentreDelta[1] + curChunkCentre[1],
					];
					// Reset Top, Left to adjust to grid centre
					centreApi.set({
						top: newOffsets[0],
						left: newOffsets[1],
						centreDelta: reducedNewCentreDelta,
						xy: newChunkCentre,
					});
					return newChunkCentre;
				});

				setLoading(false);

				centreApi.start({
					backgroundColor: "white",
				});
				localStorage.setItem("top", newOffsets[0]);
				localStorage.setItem("left", newOffsets[1]);
				localStorage.setItem("centreDelta", reducedNewCentreDelta);
			})();
		} else {
			const newCentreDelta = calculateCentre(draggedTop, draggedLeft);
			// Set Window Centre relative to grid
			centreApi.set({
				centreDelta: newCentreDelta,
				backgroundColor: "white",
				xy: [chunkCentre[0] + newCentreDelta[0], chunkCentre[1] + newCentreDelta[1]],
			});
			localStorage.setItem("top", draggedTop);
			localStorage.setItem("left", draggedLeft);
			localStorage.setItem("centreDelta", newCentreDelta);
		}
	};

	// Event Handlers
	const handleClick = () => {
		if (top.idle && left.idle) alert("Hello");
	};

	return (
		<div className="App">
			<Grid
				dragBind={dragBind}
				rows={rows}
				handleClick={handleClick}
				cellSize={cellSize}
				top={top}
				left={left}
			/>
			{/* <CentreCounter backgroundColor={backgroundColor} centreDelta={centreDelta} /> */}
			<Menu xy={xy} />
		</div>
	);
};
// Game Grid Component
const Grid = ({ dragBind, rows, handleClick, cellSize, top, left }) => {
	return (
		<animated.div className="grid-container" {...dragBind()}>
			<animated.div className="grid" style={{ top, left }}>
				{rows.map((row, row_ind) => {
					return (
						<div className="row" key={row_ind}>
							{row.map((cell, index) => {
								return (
									<div
										key={index}
										onClick={() => handleClick(index)}
										className={`cell ${cell.length !== 1 ? "plot" : "cloud"} ${
											Math.round(Math.random()) ? "bright" : null
										}`}
										style={{ width: cellSize, height: cellSize }}>
										{cell.length !== 1 ? (
											!(cell[0] || cell[1]) ? (
												<img draggable="false" src="./spawn.png" alt="spawn.png" />
											) : (
												<img draggable="false" src="./assets/img/locked.png" alt="plot.png" />
											)
										) : (
											<img draggable="false" src="./assets/img/cloud.png" alt="" />
										)}
										<h1>{cell.toString()}</h1>
									</div>
								);
							})}
						</div>
					);
				})}
			</animated.div>
		</animated.div>
	);
};
// Grid Centre Indicator
const CentreCounter = ({ backgroundColor, centreDelta }) => {
	return (
		<animated.span id="centre" style={{ backgroundColor }}>
			<animated.span>{centreDelta}</animated.span>.
		</animated.span>
	);
};

export default App;
