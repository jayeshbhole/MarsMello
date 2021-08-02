import React, { useState } from "react";

const Factory = () => {
	const [page, setPage] = useState(0);

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
					<table>
						<tr>
							<th> </th>
							<th>Name</th>
							<th>Produce</th>
							<th>Cords</th>
							<th>Price</th>
							<th> </th>
						</tr>
						<tr>
							<td>*</td>
							<td>FactID</td>
							<td>Fe</td>
							<td>(0, 1)</td>
							<td>1.0 MLO</td>
							<td>
								<button className="sell-btn">Sell</button>
							</td>
						</tr>
						<tr>
							<td>#</td>
							<td>FactID</td>
							<td>Au</td>
							<td>(0, -1)</td>
							<td>0.8 MLO</td>
							<td>
								<button className="sell-btn">Sell</button>
							</td>
						</tr>
						<tr>
							<td>&</td>
							<td>FactID</td>
							<td>Ti</td>
							<td>(0, 9)</td>
							<td>2.0 MLO</td>
							<td>
								<button className="sell-btn">Sell</button>
							</td>
						</tr>
						<tr>
							<td>@</td>
							<td>FactID</td>
							<td>Cu</td>
							<td>(0, 5)</td>
							<td>1.2 MLO</td>
							<td>
								<button className="sell-btn">Sell</button>
							</td>
						</tr>
						<tr>
							<td>$</td>
							<td>FactID</td>
							<td>Al</td>
							<td>(0, -4)</td>
							<td>0.08 MLO</td>
							<td>
								<button className="sell-btn">Sell</button>
							</td>
						</tr>
					</table>
				</div>
			) : (
				<div className="content market">
					<div className="ingame">
						<button className="buy-btn">Buy a New Factory</button>
					</div>
					<div className="auction">
						<table>
							<tr>
								<th> </th>
								<th>Name</th>
								<th>Produce</th>
								<th>Cords</th>
								<th>Price</th>
								<th> </th>
							</tr>
							<tr>
								<td>*</td>
								<td>FactID</td>
								<td>Fe</td>
								<td>(0, 1)</td>
								<td>1.0 MLO</td>
								<td>
									<button className="bid-btn">Bid</button>
								</td>
							</tr>
							<tr>
								<td>#</td>
								<td>FactID</td>
								<td>Au</td>
								<td>(0, -1)</td>
								<td>0.8 MLO</td>
								<td>
									<button className="bid-btn">Bid</button>
								</td>
							</tr>
							<tr>
								<td>&</td>
								<td>FactID</td>
								<td>Ti</td>
								<td>(0, 9)</td>
								<td>2.0 MLO</td>
								<td>
									<button className="bid-btn">Bid</button>
								</td>
							</tr>
							<tr>
								<td>@</td>
								<td>FactID</td>
								<td>Cu</td>
								<td>(0, 5)</td>
								<td>1.2 MLO</td>
								<td>
									<button className="bid-btn">Bid</button>
								</td>
							</tr>
							<tr>
								<td>$</td>
								<td>FactID</td>
								<td>Al</td>
								<td>(0, -4)</td>
								<td>0.08 MLO</td>
								<td>
									<button className="bid-btn">Bid</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Factory;
