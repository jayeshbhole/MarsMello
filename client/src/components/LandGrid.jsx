import { animated } from "@react-spring/web";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { Web3Context } from "../context/Web3Context";
import { MemoPlot, MemoCloud } from "./GameComponents";

// Game Grid Component
const LandGrid = () => {
	const { chunkCentre, dragBind, gridData, handlePlotClick, top, left } = useContext(GameContext);
	const { account } = useContext(Web3Context);

	const templateGridArray = Array.from({ length: 31 }, (_, y) => {
		if (y < 5 || y >= 26)
			return Array.from({ length: 31 }, (_, x) => {
				return { cloud: true, x: x - 15 + chunkCentre[0], y: -y + 15 + chunkCentre[1] };
			});
		return Array.from({ length: 31 }, (_, x) => {
			if (x < 5 || x >= 26)
				return { cloud: true, x: x - 15 + chunkCentre[0], y: -y + 15 + chunkCentre[1] };
			return (
				gridData?.[`${x - 15 + chunkCentre[0]},${-y + 15 + chunkCentre[1]}`] || {
					seed: -1,
					x: x - 15 + chunkCentre[0],
					y: -y + 15 + chunkCentre[1],
				}
			);
		});
	});
	return (
		<animated.div className="grid-container" {...dragBind()}>
			<animated.div className="grid" style={{ top, left }}>
				{templateGridArray.map((row, row_ind) => {
					return (
						<div className="row" key={row_ind}>
							{row.map((cell, col_ind) => {
								return !cell?.cloud ? (
									<MemoPlot
										handlePlotClick={handlePlotClick}
										cellData={gridData?.[`${cell.x},${cell.y}`] || cell}
										block={[cell.x, cell.y]}
										key={[cell.x, cell.y]}
										owned={account && cell?.owner?.id === account}
									/>
								) : (
									<MemoCloud key={[row_ind - col_ind]} />
								);
							})}
						</div>
					);
				})}
				{}
			</animated.div>
		</animated.div>
	);
};
export default LandGrid;
