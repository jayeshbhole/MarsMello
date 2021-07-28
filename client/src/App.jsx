import { useEffect, useState } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";

function App() {
	const [hk, setHk] = useState([15, 15]);
	const [rows, setRows] = useState(
		Array.from({ length: 31 }, (_, y) => {
			if (y < 5 || y >= 26) return Array.from({ length: 31 }, () => [1]);
			return Array.from({ length: 31 }, (_, x) => {
				if (x < 5 || x >= 26) return [1];
				return [x - hk[0], -y + hk[1]];
			});
		})
	);
	const [centre, setCentre] = useState([0, 0]);
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const cellSize = Math.max(windowWidth, windowHeight) / 10;
	const gridSize = cellSize * 31;
	const paddingSize = cellSize * 5;

	// Springy
	const [{ centreSpring, backgroundColor }, setCentreSpring] = useSpring(() => ({
		centreSpring: [0, 0],
		backgroundColor: "white",
	}));
	const [{ top, left }, dragApi] = useSpring(() => ({
		top: -((gridSize - windowHeight) / 2),
		left: -((gridSize - windowWidth) / 2),
		config: { tension: 500, friction: 120 },
	}));

	const dragBind = useDrag(
		({ movement: [mx, my], tap, last, vxvy: [vx, vy], first }) => {
			if (tap) return;
			dragApi.start({
				top: my,
				left: mx,
			});
			if (last) {
				calculateCentre(top.goal, left.goal);
			}
		},
		{ initial: () => [left.get(), top.get()] }
	);

	const calculateCentre = (top, left) => {
		const padding = 0.75 * paddingSize;
		const centre = [
			Math.floor((-left - paddingSize - cellSize + windowWidth / 2) / cellSize) - 9,
			-Math.floor((-top - paddingSize - cellSize + windowHeight / 2) / cellSize) + 9,
		];
		if (
			-top < padding ||
			-left < padding ||
			-top > gridSize - padding - windowHeight ||
			-left > gridSize - padding - windowWidth
		) {
			setCentreSpring.set({ backgroundColor: "red", centreSpring: centre });
		} else setCentreSpring.set({ centreSpring: centre, backgroundColor: "white" });
	};

	const handleClick = () => {
		if (top.idle && left.idle) alert("Hello");
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
											{/* <h1>{cell.toString()}</h1> */}
										</div>
									);
								})}
							</div>
						);
					})}
				</animated.div>
			</animated.div>
			<animated.span id="centre" style={{ backgroundColor }}>
				{/* {[Math.floor(top.get()), Math.floor(top.get())].toString()} */}
				{centreSpring}
			</animated.span>
		</div>
	);
}

export default App;
