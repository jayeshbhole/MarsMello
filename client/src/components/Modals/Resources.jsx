import React, { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import manageNumbers from "../../utils/manageNumbers";
import resourceList from "../../utils/resourceList.json";

const Resources = () => {
	const { balances, claimAll } = useContext(Web3Context);
	return (
		<div className="resos">
			<h1>Resources</h1>
			<div className="content">
				<div className="container">
					<button onClick={claimAll}>Claim all Resources</button>
					<span>last claimed 1hr ago</span>
				</div>
				<h3>Your Resources</h3>
				<main>
					<div className="ores">
						{Object.keys(resourceList).map((key, _) => {
							return (
								<div key={key} className={`${resourceList[key].name.toLowerCase()} item`}>
									<span className="label">{resourceList[key].symbol}</span>
									<span className="value">
										{manageNumbers(balances[resourceList[key].symbol.toLowerCase()])}
									</span>
								</div>
							);
						})}
					</div>
					<div className="others">
						<div className="plots item">
							<span className="label">plots</span>
							<span className="value">0</span>
						</div>
						<div className="factories item">
							<span className="label">factories</span>
							<span className="value">0</span>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Resources;
