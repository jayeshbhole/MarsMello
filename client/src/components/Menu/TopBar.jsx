import React, { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";

const TopBar = ({ iron, gold, titanium, copper, aluminium }) => {
	const { account, logOut } = useContext(Web3Context);

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
			<div className={`wallet-button ${!account[0] ? "not-" : ""}connected`} onClick={logOut}>
				{account ? `Connected ...${account[0].slice(-6, -1)}` : "Not Connected"}
			</div>
		</div>
	);
};

export default TopBar;
