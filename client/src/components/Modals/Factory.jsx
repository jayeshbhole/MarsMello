import React, { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import { factoriesList } from "../../utils/factoriesList";
import Card from "../Auxillary/Card";

const Factory = () => {
	const [page, setPage] = useState(0);
	const { web3, contract, buyFactory, factories } = useContext(Web3Context);
	const factoryTypes = ["Fe", "Au", "Cu", "Al", "Ti"];

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
					{factories.map(({ id, name, x, y, type, efficiency }) => (
						<Card id={id} key={id}>
							<section className="card-left">
								<img src={`./assets/img/factories/factory_${type}.png`} alt="" />
								<span className="efficiency">
									{`${efficiency}% `}
									<span className="unit">efficient</span>
								</span>
							</section>
							<section className="card-right">
								<div className="title">{name}</div>
								<div className="produce">
									<span>
										Produces <span className="high">{factoryTypes[type]}</span>
									</span>
								</div>
								<div className="placed">
									{x && y ? (
										<span>
											Factory place at <span className="high">{`(${x}, ${y})`}</span>
										</span>
									) : (
										"Factory not placed"
									)}
								</div>
								<div className="btns">
									<button className="sell">Send</button>
									<button className="place">Place</button>
								</div>
							</section>
						</Card>
					))}
				</div>
			) : (
				<div className="content market">
					{factoriesList.map(({ type, name, rates, price }) => (
						<Card key={type}>
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
