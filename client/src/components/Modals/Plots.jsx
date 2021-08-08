import React, { useState, useContext, useEffect } from "react";
import Card from "../Auxillary/Card";
import { Web3Context } from "../../context/Web3Context";
const Plots = () => {
	const [page, setPage] = useState(0);
	const { userLandData, loadUserLandData } = useContext(Web3Context);
	// console.log(loadUserLandData);

	useEffect(() => {
		loadUserLandData();
	}, []);

	return (
		<div className="plots">
			<h1>Lands</h1>
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
					{userLandData?.user?.lands.map(({ factory, id, seed, x, y }) => (
						<Card className="plot-card" key={id}>
							<section className="card-left">
								<img src="./assets/facticon/facticon2.png" alt="" />
								<span className="rate">
									10<span className="unit">/hr</span>
								</span>
							</section>
							<section className="card-right">
								<div className="ore">
									<span className="label">Ore Distribution:</span>
									<span className="dist fe">fe</span>
									<span className="val fe">50%</span>
									<span className="dist au">au</span>
									<span className="val au">25%</span>
									<span className="dist cu">cu</span>
									<span className="val cu">30%</span>
									<span className="dist ti">ti</span>
									<span className="val ti">15%</span>
									<span className="dist al">al</span>
									<span className="val al">10%</span>
								</div>
								<div className="cords">
									<span className="x-label label">X:</span>
									<span className="x-value value">{x}</span>
									<span className="y-label label">Y:</span>
									<span className="y-value value">{y}</span>
								</div>
								<button className="sell">send</button>
							</section>
						</Card>
					))}
				</div>
			) : (
				<div className="content market">
					<div className="ingame">
						<button className="buy-btn">Buy a New Factory</button>
					</div>

					<Card className="plot-card">
						<section className="card-left">
							<img src="./assets/facticon/facticon2.png" alt="" />
							<span className="rate">
								10<span className="unit">/hr</span>
							</span>
						</section>
						<section className="card-right">
							<div className="ore">
								<span className="label">Ore Distribution:</span>
								<span className="dist fe">fe</span>
								<span className="val fe">50%</span>
								<span className="dist au">au</span>
								<span className="val au">25%</span>
								<span className="dist cu">cu</span>
								<span className="val cu">30%</span>
								<span className="dist ti">ti</span>
								<span className="val ti">15%</span>
								<span className="dist al">al</span>
								<span className="val al">10%</span>
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

export default Plots;
