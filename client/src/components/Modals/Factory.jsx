import React, { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import Card from "../Auxillary/Card";

const Factory = () => {
	const [page, setPage] = useState(0);
	const { web3, contract } = useContext(Web3Context);

	return (
		<div className="factory">
			<h1>Factories</h1>
			<div className="tabs">
				<div
					onClick={() => {
						setPage(0);
					}}
					className={page === 0 ? "tab owned active" : "tab owned"}>
					Owned
				</div>
				<div
					onClick={() => {
						setPage(1);
					}}
					className={page === 1 ? "tab owned active" : "tab owned"}>
					Market Place
				</div>
			</div>
			{page === 0 ? (
				<div className="content owned">
					<Card className="owned-2">
						<section className="card-left">
							<img src="./assets/facticon/facticon2.png" alt="" />
							<span className="rate">
								10<span className="unit">/hr</span>
							</span>
						</section>
						<section className="card-right">
							<div className="name">
								<span className="label">Name:</span>
								<span className="value">Factory1</span>
							</div>
							<div className="produce">
								<span className="label">Produce:</span>
								<span className="value">Fe</span>
							</div>
							<div className="cords">
								<span className="x-label label">X:</span>
								<span className="x-value value">0</span>
								<span className="y-label label">Y:</span>
								<span className="y-value value">5</span>
							</div>
							<div className="btns">
								<button className="sell" title="Sell the factory">
									Sell
								</button>
								<button className="place">Place</button>
							</div>
						</section>
					</Card>
				</div>
			) : (
				<div className="content market">
					<div className="ingame">
						<button className="buy-btn">Buy a New Factory</button>
					</div>

					<Card className="owned-2">
						<section className="card-left">
							<img src="./assets/facticon/facticon2.png" alt="" />
							<span className="rate">
								10<span className="unit">/hr</span>
							</span>
						</section>
						<section className="card-right">
							<div className="name">
								<span className="label">Name:</span>
								<span className="value">Factory1</span>
							</div>
							<div className="produce">
								<span className="label">Produce:</span>
								<span className="value">Fe</span>
							</div>
							<div className="cords">
								<span className="x-label label">X:</span>
								<span className="x-value value">0</span>
								<span className="y-label label">Y:</span>
								<span className="y-value value">5</span>
							</div>
							<button className="bid">Bid</button>
						</section>
					</Card>
				</div>
			)}
		</div>
	);
};

export default Factory;
