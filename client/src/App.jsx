import { useState } from "react";
import "./styles/index.scss";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, config } from "@react-spring/web";

function App() {
	const [plots, setPlots] = useState(
		Array.from({ length: 30 }, (v, ind) => {
			if (ind < 5 || ind >= 25) return Array.from({ length: 30 }, (v, i) => 2);
			return Array.from({ length: 30 }, (v, i) => {
				if (i < 5 || i >= 25) return 2;
				return 1;
			});
		})
	);

	const cellSize = Math.max(window.innerWidth, window.innerHeight) / 10;
	const gridSize = cellSize * 30 + 290;
	// Springy
	const [{ top, left }, dragApi] = useSpring(() => ({
		top: -(gridSize / 2),
		left: -(gridSize / 2),
		config: config.molasses,
	}));

	const dragBind = useDrag(
		({ movement: [mx, my], tap, last }) => {
			if (tap) return;
			dragApi.start({
				top: my,
				left: mx,
			});
			if (last) {
				// Check if out of bounds
				// fetch new data
				// Set data in the state
				// Set offset to overflow delta
			}
		},
		{ initial: () => [left.get(), top.get()] }
	);

	return (
		<div className="App">
			<animated.div className="grid-container" {...dragBind()}>
				<animated.div className="grid" style={{ top, left }}>
					{plots.map((row, _) => {
						return row.map((cell, index) => {
							return (
								<div
									key={index}
									className={`cell ${cell === 1 ? "render" : "placeholder"}`}
									style={{ width: cellSize, height: cellSize }}>
									{cell}
								</div>
							);
						});
					})}
				</animated.div>
			</animated.div>
		</div>
	);
}

export default App;
