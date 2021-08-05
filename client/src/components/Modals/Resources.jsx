import React from "react";

const Factory = () => {
	return (
		<div className="resos">
			<h1>Resources</h1>
			<div className="content">
				<div className="container">
					<button>Collect all Resources</button>
				</div>
				<h3>Your Resources</h3>
				<main>
					<div className="ores">
						<div className="iron item">
							<span className="label">fe</span>
							<span className="value">0</span>
						</div>
						<div className="gold item">
							<span className="label">au</span>
							<span className="value">0</span>
						</div>
						<div className="copper item">
							<span className="label">cu</span>
							<span className="value">0</span>
						</div>
						<div className="titanium item">
							<span className="label">ti</span>
							<span className="value">0</span>
						</div>
						<div className="aluminium item">
							<span className="label">al</span>
							<span className="value">0</span>
						</div>
					</div>
					<div className="others">
						<div className="plots item">
							<span className="label">plots</span>
							<span className="value">0</span>
						</div>
						<div className="factories item">
							<span className="label">factories</span>
							<span className="value">0</span>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Factory;
