import React, { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import { factoriesList } from "../../utils/factoriesList";
import Card from "../Auxillary/Card";

const Factory = () => {
	const [page, setPage] = useState(0);
	const { factories, buyFactory } = useContext(Web3Context);

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
					{factories ? (
						factories.map(({ name, id, x, y, type, efficiency }) => {
							return (
								<Card key={id}>
									<section className="card-left">
										<img src={`./assets/img/factories/factory_${type}.png`} alt="" />

										<span className="rate">
											{`${efficiency}% `}
											<span className="unit">efficient</span>
										</span>
									</section>
									<section className="card-right">
										<div className="name">
											<span className="value">{name}</span>
										</div>
										<div className="produce">
											<span className="label">Produce:</span>
											<span className="high">{factoriesList[type].produce}</span>
										</div>
										<div className="placed">
											{x && y ? (
												<span>
													Factory place at <span className="high">{`(${x}, ${y})`}</span>
												</span>
											) : (
												<span>factory not placed</span>
											)}
										</div>
										<div className="btns">
											<button className="sell" title="Sell the factory">
												Sell
											</button>
											<button className="place">Place</button>
										</div>
									</section>
								</Card>
							);
						})
					) : (
						<h1>Cricket Noises...</h1>
					)}
				</div>
			) : (
				<div className="content market">
					{factoriesList.map(({ type, name, rates, price }) => (
						<Card key={type} className="owned-2">
							<section className="card-left">
								<img src={`./assets/img/factories/factory_${type}.png`} alt="" />
								<span className="rate">
									{rates[0]}-{rates[1]}
									<span className="unit">/hr</span>
								</span>
							</section>
							<section className="card-right">
								<span className="title">{name}</span>
								<span className="price">
									{price}
									<span className="token">MLO</span>
								</span>
								<button onClick={() => buyFactory(name, type)} className="bid">
									Buy
								</button>
							</section>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default Factory;
