import { useState } from "react";
import "./styles/index.scss";

function App() {
	const [plots, setPlots] = useState(Array.from({ length: 400 }, (v, i) => i));
	return (
		<div className="App">
			<div className="grid-container">
				<div className="grid">
					{plots.map((_, index) => {
						return (
							<div key={index} className="cell">
								{_}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
