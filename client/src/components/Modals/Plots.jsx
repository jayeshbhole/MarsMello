import React, { useState, useContext, useEffect } from "react";
import Card from "../Auxillary/Card";
import { Web3Context } from "../../context/Web3Context";
import getLandRates from "../../utils/getLandRate";
import LandPreview from "../Auxillary/LandPreview";

const Plots = () => {
	const [page, setPage] = useState(0);
	const { userLandData, loadUserLandData } = useContext(Web3Context);

	useEffect(() => {
		loadUserLandData();
	}, []);
	// console.log(userLandData);

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
					{userLandData?.user?.lands.map((land) => (
						<Card className="plot-card" key={land.id}>
							<section className="card-left">
								<LandPreview cellData={land} />
							</section>
							<section className="card-right">
								<div className="ore">
									<span className="label">Ore Distribution:</span>
									<span className="dist fe">fe</span>
									<span className="val fe">{`${getLandRates(land.seed, 0)}%`}</span>
									<span className="dist au">al</span>
									<span className="val au">{`${getLandRates(land.seed, 1)}%`}</span>
									<span className="dist cu">cu</span>
									<span className="val cu">{`${getLandRates(land.seed, 2)}%`}</span>
									<span className="dist ti">au</span>
									<span className="val ti">{`${getLandRates(land.seed, 3)}%`}</span>
									<span className="dist al">ti</span>
									<span className="val al">{`${getLandRates(land.seed, 4)}%`}</span>
								</div>
								<div className="is-factory">
									{land.factory
										? `${land.factory.name} with id ${land.factory.id} placed`
										: "no factory on land"}
								</div>
								<div className="cords">
									<span className="x-label label">X:</span>
									<span className="x-value value">{land.x}</span>
									<span className="y-label label">Y:</span>
									<span className="y-value value">{land.y}</span>
								</div>
								<button className="sell">send</button>
							</section>
						</Card>
					))}
				</div>
			) : (
				<div className="content market">
					<div className="ingame">
						<button className="buy-btn">Buy a New Land</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Plots;
