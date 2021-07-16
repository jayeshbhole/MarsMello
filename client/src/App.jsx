import { useState } from "react";
import "./styles/index.scss";
import { useDrag, useGesture, usePinch, useScroll, useWheel } from "react-use-gesture";
import { useSpring, animated, config } from "@react-spring/web";

function App() {
	const [plots, setPlots] = useState(Array.from({ length: 400 }, (v, i) => i));
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const [{ top, left, transform }, api] = useSpring(() => ({
		top: -(windowHeight / 2),
		left: -(windowWidth / 2),
		transform: `scale(1)`,
		config: config.molasses,
	}));

	const bind = useDrag(
		({ movement: [mx, my], tap }) => {
			if (tap) return;
			api.start({
				top: my,
				left: mx,
			});
		},
		{ initial: () => [left.get(), top.get()] }
	);
	const scrollGesture = useWheel(({ distance, offset, xy }) => {
		console.log(distance, offset, xy);
		api.start({ transform: `scale(${distance / windowHeight})` });
	});
	// const scrollGesture = useWheel((state) => {
	// 	console.log(state);
	// });
	return (
		<div className="App">
			<animated.div className="grid-container" style={transform} {...scrollGesture()}>
				<animated.div className="grid" {...bind()} style={{ top, left }}>
					{plots.map((_, index) => {
						return (
							<div key={index} className="cell">
								{_}
							</div>
						);
					})}
				</animated.div>
			</animated.div>
		</div>
	);
}

export default App;
