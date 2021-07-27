import { useEffect, useState } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";

function App() {
	const [hk, setHk] = useState([15, 15]);
	const [plots, setPlots] = useState(
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
	const [{ top, left }, dragApi] = useSpring(() => ({
		top: -((gridSize - windowHeight) / 2),
		left: -((gridSize - windowWidth) / 2),
		config: { tension: 500, friction: 120 },
	}));

	const dragBind = useDrag(
		({ movement: [mx, my], tap, last, vxvy: [vx, vy], first }) => {
			if (tap) return;
			// if (first && (Math.abs(vx) < 1 || Math.abs(vy) < 1)) return;
			dragApi.start({
				top: my,
				left: mx,
			});
			if (last) {
				calculateCentre(top.goal, left.goal);
				// console.log(top.goal, left.goal);
				// Check if out of bounds
				// fetch new data
				// fetchData(top.goal, left.goal);
				// Set data in the state
				// setPlots()
				// Set offset to overflow delta
				// api.start()
			}
		},
		{ initial: () => [left.get(), top.get()] }
	);

	const calculateCentre = (top, left, callback) => {
		const centre = [
			Math.floor((-left - paddingSize - cellSize + windowWidth / 2) / cellSize) - 9,
			-Math.floor((-top - paddingSize - cellSize + windowHeight / 2) / cellSize) + 9,
		];
		setCentre(centre);
	};

	useEffect(() => {
		console.log(...centre);
	}, [centre]);
	const fetchData = async ([x, y]) => {
		// setHk(centre[0])
		// setTimeout(() => {
		// 	console.log("Coords", x, y);
		// }, 2000);
	};
	const handleClick = () => {
		if (top.idle && left.idle) alert("Hello");
	};

	return (
		<div className="App">
			<animated.div className="grid-container" {...dragBind()}>
				<animated.div className="grid" style={{ top, left }}>
					{plots.map((row, row_ind) => {
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
												<img
													draggable="false"
													src={`./assets/img/pixplot_${Math.floor(Math.random() * 1)}.png`}
													alt="plot.png"
												/>
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
			<span
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
					background: "red",
				}}>
				H
			</span>
		</div>
	);
}

export default App;
