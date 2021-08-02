import React from "react";

const TopBar = ({ iron, gold, titanium, copper, aluminium }) => {
	return (
		<div className="topbar bar">
			<div className="item Fe">
				<div className="value">
					<h1>{iron}</h1>
				</div>
				<div className="key">
					<h3>Fe</h3>
				</div>
			</div>
			<div className="item Au">
				<div className="value">
					<h1>{gold}</h1>
				</div>
				<div className="key">
					<h3>Au</h3>
				</div>
			</div>
			<div className="item Ti">
				<div className="value">
					<h1>{titanium}</h1>
				</div>
				<div className="key">
					<h3>Ti</h3>
				</div>
			</div>
			<div className="item Cu">
				<div className="value">
					<h1>{copper}</h1>
				</div>
				<div className="key">
					<h3>Cu</h3>
				</div>
			</div>
			<div className="item Al">
				<div className="value">
					<h1>{aluminium}</h1>
				</div>
				<div className="key">
					<h3>Al</h3>
				</div>
			</div>
			<div className="wallet-button not-connected">Connected ...093s</div>
		</div>
	);
};

export default TopBar;
