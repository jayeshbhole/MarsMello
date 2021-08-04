// import { useState, useEffect, useContext } from "react";
import "./styles/index.scss";
import { animated } from "@react-spring/web";
import { MemoPlot, MemoCloud } from "./components/GameComponents";
import Menu from "./components/Menu/";
import MiniMenu from "./components/MiniMenu";
// import web3 from "./context/web3Context";
import MiniModal from "./components/MiniModals";
import { Web3Context, Web3ContextProvider } from "./context/Web3Context";
import useGame from "./hooks/useGame";

const App = () => {
	const {
		teleport,
		top,
		left,
		cellSize,
		// centreDelta,
		miniMenuStyles,
		xy,
		// backgroundColor,
		miniMenuApi,
		rows,
		isMiniOpen,
		setIsMiniOpen,
		miniModal,
		selectedBlock,
		handlePlotClick,
		handleMiniClick,
		dragBind,
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
					dragBind={dragBind}
					rows={rows}
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
const Grid = ({ dragBind, rows, handlePlotClick, top, left }) => {
	return (
		<animated.div className="grid-container" {...dragBind()}>
			<animated.div className="grid" style={{ top, left }}>
				{rows.map((row, row_ind) => {
					return (
						<div className="row" key={row_ind}>
							{row.map((cell, ind) => {
								return cell.length !== 1 ? (
									<MemoPlot handlePlotClick={handlePlotClick} cell={cell} key={ind} />
								) : (
									<MemoCloud key={ind} />
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
