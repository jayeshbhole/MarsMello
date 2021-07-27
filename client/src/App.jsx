import { useState } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";

function App() {
	const [plots, setPlots] = useState(
		//[][]
		Array.from({ length: 31 }, (v, ind) => {
			if (ind < 5 || ind >= 26) return Array.from({ length: 31 }, () => 2);
			return Array.from({ length: 31 }, (_, i) => {
				if (i < 5 || i >= 26) return 2;
				return 1;
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
				// console.log(top.goal, left.goal);
				// Check if out of bounds
				// fetch new data
				fetchData(top.goal, left.goal);
				// Set data in the state
				// setPlots()
				// Set offset to overflow delta
				// api.start()
			}
		},
		{ initial: () => [left.get(), top.get()] }
	);

	// const calculateCentre()

	const fetchData = (topGoal, leftGoal) => {
		// topGoal, leftGoal
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
											className={`cell ${cell === 1 ? "plot" : "cloud"} ${
												Math.round(Math.random()) ? "bright" : null
											}`}
											style={{ width: cellSize, height: cellSize }}>
											{cell === 2 ? (
												<img draggable="false" src="./assets/img/cloud.png" alt="" />
											) : (
												<img
													draggable="false"
													src={`./assets/img/pixplot_${Math.round(Math.random() * 4)}.png`}
													alt="plot.png"
												/>
											)}
										</div>
									);
								})}
							</div>
						);
					})}
				</animated.div>
			</animated.div>
		</div>
	);
}

export default App;
