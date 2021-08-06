// import { useState, useEffect, useContext } from "react";
import "./styles/index.scss";
import { animated } from "@react-spring/web";
import { MemoPlot, MemoCloud } from "./components/GameComponents";
import Menu from "./components/Menu/";
import MiniMenu from "./components/MiniMenu";
import MiniModal from "./components/MiniModals";
import { Web3ContextProvider } from "./context/Web3Context";
import useGame from "./hooks/useGame";

const App = () => {
	const {
		teleport,
		top,
		left,
		cellSize,
		miniMenuStyles,
		xy,
		chunkCentre,
		miniMenuApi,
		gridData,
		isMiniOpen,
		setIsMiniOpen,
		miniModal,
		selectedBlock,
		handlePlotClick,
		handleMiniClick,
		dragBind
	} = useGame();

	return (
		<Web3ContextProvider>
			<div className="App">
				<style>
					{`.cell{
					height:${cellSize}px;
					width:${cellSize}px;
				}`}
				</style>
				<Grid
					chunkCentre={chunkCentre}
					dragBind={dragBind}
					gridData={gridData}
					handlePlotClick={handlePlotClick}
					cellSize={cellSize}
					top={top}
					left={left}
				/>
				{/* <CentreCounter backgroundColor={backgroundColor} centreDelta={centreDelta} /> */}
				<MiniMenu
					styles={miniMenuStyles}
					selectedBlock={selectedBlock}
					miniMenuApi={miniMenuApi}
					openMini={handleMiniClick}
				/>
				{isMiniOpen && (
					<MiniModal setIsMiniOpen={setIsMiniOpen}>
						<h1>{miniModal}</h1>
					</MiniModal>
				)}
				<Menu xy={xy} teleport={teleport} />
			</div>
		</Web3ContextProvider>
	);
};

// Game Grid Component
const Grid = ({ chunkCentre, dragBind, gridData, handlePlotClick, top, left }) => {
	// console.log(gridData);

	const templateGridArray = Array.from({ length: 31 }, (_, y) => {
		if (y < 5 || y >= 26)
			return Array.from({ length: 31 }, (x) => {
				return { cloud: true, x: x - 15 + chunkCentre[0], y: -y + 15 + chunkCentre[1] };
			});
		return Array.from({ length: 31 }, (_, x) => {
			if (x < 5 || x >= 26)
				return { cloud: true, x: x - 15 + chunkCentre[0], y: -y + 15 + chunkCentre[1] };
			return { seed: -1, x: x - 15 + chunkCentre[0], y: -y + 15 + chunkCentre[1] };
		});
	});

	return (
		<animated.div className="grid-container" {...dragBind()}>
			<animated.div className="grid" style={{ top, left }}>
				{templateGridArray.map((row, row_ind) => {
					return (
						<div className="row" key={row_ind}>
							{row.map((cell, col_ind) => {
								return !cell.cloud ? (
									<MemoPlot
										handlePlotClick={handlePlotClick}
										cellData={
											gridData?.[`${col_ind - 15 + chunkCentre[0]}`]?.[
												`${-row_ind + 15 + chunkCentre[1]}`
											] || cell
										}
										block={[col_ind - 15 + chunkCentre[0], -row_ind + 15 + chunkCentre[1]]}
										key={[col_ind, row_ind]}
									/>
								) : (
									<MemoCloud key={col_ind} />
								);
							})}
						</div>
					);
				})}
			</animated.div>
		</animated.div>
	);
};

export default App;
