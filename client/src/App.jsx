import { useState, useEffect } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, config } from "@react-spring/web";
import Menu from "./components/Menu";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
	const hk = [15, 15];
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const cellSize = Math.max(windowWidth, windowHeight) / 10;
	const gridSize = cellSize * 31;
	const paddingSize = cellSize * 5;
	const centredGridOffset = [-((gridSize - windowHeight) / 2), -((gridSize - windowWidth) / 2)];

	const [rows, setRows] = useState(
		Array.from({ length: 31 }, (_, y) => {
			if (y < 5 || y >= 26) return Array.from({ length: 31 }, () => [1]);
			return Array.from({ length: 31 }, (_, x) => {
				if (x < 5 || x >= 26) return [1];
				return [x - hk[0], -y + hk[1]];
			});
		})
	);
	const [loading, setLoading] = useState(false);

	// Springy
	const [{ top, left, centre, backgroundColor }, centreApi] = useSpring(() => ({
		top: centredGridOffset[0],
		left: centredGridOffset[1],
		centre: [0, 0],
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
				// centreApi.stop();
				handleDragEnd(top.goal, left.goal);
				return;
			}
			centreApi.start({
				top: my,
				left: mx,
			});
			centreApi.set({
				centre: calculateCentre(top.goal, left.goal),
				backgroundColor: isOutOfBounds(top.goal, left.goal) ? "red" : "white",
			});
		},
		{ initial: () => [left.get(), top.get()] }
	);

	// Player Movements
	const calculateCentre = (top, left) => {
		return [
			Math.floor((-left - paddingSize + windowWidth / 2) / cellSize) - 10,
			-Math.floor((-top - paddingSize + windowHeight / 2) / cellSize) + 10,
		];
	};
	const isOutOfBounds = (top, left) => {
		const padding = 0.75 * paddingSize;
		if (-top < padding || -top > gridSize - padding - windowHeight) return true;
		if (-left < padding || -left > gridSize - padding - windowWidth) return true;
		return false;
	};
	const handleDragEnd = async (newTop, newLeft) => {
		// const centre = calculateCentre(top, left);
		if (isOutOfBounds(newTop, newLeft)) {
			while (true) {
				setLoading(true);
				if (!top.idle || !left.idle) await sleep(500);
				else break;
			}

			const displacement = [
				(newTop - centredGridOffset[0]) % cellSize,
				-((newLeft - centredGridOffset[1]) % cellSize),
			];
			const newOffsets = [
				centredGridOffset[0] + displacement[0],
				centredGridOffset[1] - displacement[1],
			];
			centreApi.set({
				top: newOffsets[0],
				left: newOffsets[1],
				centre: calculateCentre(...newOffsets),
				backgroundColor: "white",
			});
			setLoading(false);
		} else {
			centreApi.set({
				centre: calculateCentre(newTop, newLeft),
				backgroundColor: "white",
			});
		}
	};

	// Event Handlers
	const handleClick = () => {
		// if (top.idle && left.idle) alert("Hello");
	};

	return (
		<div className="App">
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
			<animated.span id="centre" style={{ backgroundColor }}>
				{centre}
			</animated.span>
			{/* Menus */}
			<Menu />
		</div>
	);
}

export default App;
