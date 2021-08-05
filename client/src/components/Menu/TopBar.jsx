import React, { useContext, useEffect } from "react";
import { Web3Context } from "../../context/Web3Context";
import manageNumbers from "../../utils/manageNumbers";

const TopBar = () => {
	const {
		account,
		getWeb3ModalProvider,
		balances: { FE, AU, TI, CU, AL, MLO },
	} = useContext(Web3Context);

	return (
		<div className="topbar bar">
			<div className="item Fe">
				<div className="value">
					<h1>{manageNumbers(FE)}</h1>
				</div>
				<div className="key">
					<h3>Fe</h3>
				</div>
			</div>
			<div className="item Au">
				<div className="value">
					<h1>{manageNumbers(AU)}</h1>
				</div>
				<div className="key">
					<h3>Au</h3>
				</div>
			</div>
			<div className="item Ti">
				<div className="value">
					<h1>{manageNumbers(TI)}</h1>
				</div>
				<div className="key">
					<h3>Ti</h3>
				</div>
			</div>
			<div className="item Cu">
				<div className="value">
					<h1>{manageNumbers(CU)}</h1>
				</div>
				<div className="key">
					<h3>Cu</h3>
				</div>
			</div>
			<div className="item Al">
				<div className="value">
					<h1>{manageNumbers(AL)}</h1>
				</div>
				<div className="key">
					<h3>Al</h3>
				</div>
			</div>
			<div className={`holding ${!account ? "not-" : ""}connected`} onClick={getWeb3ModalProvider}>
				{!account ? (
					<span className="cta">Connect Wallet</span>
				) : (
					<span className="cta">
						<span className="bal">Balance</span>
						<span className="main">
							{manageNumbers(MLO)}
							<span>MLO</span>
						</span>
					</span>
				)}
			</div>
		</div>
	);
};

export default TopBar;
