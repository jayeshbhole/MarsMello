import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";
import Card from "../Auxillary/Card";

const Add = () => {
	const { selectedBlock } = useContext(GameContext);
	const { factories, placeFactory } = useContext(Web3Context);
	const [fid, setFid] = useState("");
	// console.log("factories", factories);

	return !factories ? (
		<div className="add-content content">
			<span className="prompt">
				Choose Factory to place at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<div className="select">
				{/* <select name="factory" id="factory-list">
					<optgroup label="Inventory">
						{factories.map(({ x, y, name }) => {
							if (x === 0 || y === 0 || !x || !y) {
								return <option value={name}>{name}</option>;
							}
						})}
					</optgroup>
					<optgroup label="Teleport">
						{factories.map(({ x, y, name }) => {
							if (x !== 0 || y !== 0 || x || y) {
								return <option value={name}>{name}</option>;
							}
						})}
					</optgroup>
				</select> */}
				<div className="select-inv">
					<div className="title-inv select-title">Inventory</div>
					<div className="select-cards">
						<Card key={0} className="inv">
							<section className="card-left">
								<img src={`./assets/img/factories/factory_${0}.png`} alt="" />
							</section>
							<section className="card-right">
								<span className="title">{`Iron Miner`}</span>
								<span className="rate">
									{5}-{10}
									<span className="unit">/hr</span>
								</span>
							</section>
						</Card>
					</div>
				</div>
				<div className="select-tp">
					<div className="title-tp select-title">Teleport</div>
					<div className="select-cards">
						<Card key={0} className="tp">
							<section className="card-left">
								<img src={`./assets/img/factories/factory_${1}.png`} alt="" />
							</section>
							<section className="card-right">
								<span className="title">{`Gold Miner`}</span>
								<span className="rate">
									{10}-{15}
									<span className="unit">/hr</span>
								</span>
								<div className="cords">
									<span className="cords-label">Current Cords.</span>
									<span className="cords-val">{` (${1}, ${0})`}</span>
								</div>
							</section>
						</Card>
					</div>
				</div>
			</div>
			<button
				onClick={() => placeFactory(fid, selectedBlock?.x, selectedBlock?.y)}
				className="place-factory">
				Place
			</button>
		</div>
	) : (
		<div className="add-content content">
			<span className="prompt">No Factories in Inventory to place.</span>
			<button className="buy-fact">Buy a factory</button>
		</div>
	);
};

export default Add;
