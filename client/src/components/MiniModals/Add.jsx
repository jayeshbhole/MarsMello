import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { Web3Context } from "../../context/Web3Context";
import Card from "../Auxillary/Card";

const Add = ({ setIsOpen }) => {
	const { selectedBlock } = useContext(GameContext);
	const { factories, placeFactory } = useContext(Web3Context);
	const [fid, setFid] = useState();
	const handlePlaceFactory = () => {
		placeFactory(fid, selectedBlock?.x, selectedBlock?.y);
		setIsOpen(false);
	};
	// console.log("factories", factories);

	return factories ? (
		<div className="add-content content">
			<span className="prompt">
				Choose Factory to place at
				<span className="high">{` (${selectedBlock?.x}, ${selectedBlock?.y})`}</span>
			</span>
			<div className="select">
				<div className="select-inv">
					<div className="title-inv select-title">Inventory</div>
					<div className="select-cards">
						{factories.map(({ id, x, y, name, type, efficiency }) => {
							if (!(x && y))
								return (
									<Card
										onClick={() => setFid(id)}
										key={id}
										className="inv"
										id={fid === id ? "active" : null}>
										<section className="card-left">
											<img src={`./assets/img/factories/factory_${type}.png`} alt="" />
										</section>
										<section className="card-right">
											<span className="title">{name}</span>
											<span className="rate">
												{efficiency}%<span className="unit"> efficient</span>
											</span>
										</section>
									</Card>
								);
							return null;
						})}
					</div>
				</div>
				<div className="select-tp">
					<div className="title-tp select-title">Teleport</div>
					<div className="select-cards">
						{factories.map(({ id, x, y, name, type, efficiency }) => {
							if (x && y)
								return (
									<Card
										onClick={() => setFid(id)}
										key={id}
										className="tp"
										id={fid === id ? "active" : null}>
										<section className="card-left">
											<img src={`./assets/img/factories/factory_${type}.png`} alt="" />
										</section>
										<section className="card-right">
											<span className="title">{name}</span>
											<span className="rate">
												{efficiency}%<span className="unit"> efficient</span>
											</span>
											<div className="cords">
												<span className="cords-label">Current Cords.</span>
												<span className="cords-val">{` (${x}, ${y})`}</span>
											</div>
										</section>
									</Card>
								);
							return null;
						})}
					</div>
				</div>
			</div>
			<button disabled={!fid} onClick={handlePlaceFactory} className="place-factory">
				Place
			</button>
		</div>
	) : (
		<div className="add-content content">
			<span className="prompt">No Factories in Inventory.</span>
			<button className="buy-fact">Buy a factory</button>
		</div>
	);
};

export default Add;
