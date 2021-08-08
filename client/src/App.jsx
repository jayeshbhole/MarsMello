// import { useState, useEffect, useContext } from "react";
import "./styles/index.scss";
import Menu from "./components/Menu/";
import LandGrid from "./components/LandGrid";
import { Web3ContextProvider } from "./context/Web3Context";
import { GameContext, GameContextProvider } from "./context/GameContext";
import { useContext } from "react";

const App = () => {
	const { cellSize } = useContext(GameContext);

	return (
		<Web3ContextProvider>
			<GameContextProvider>
				<div className="App">
					<style>
						{`.cell{
							height:${cellSize}px;
							width:${cellSize}px;
							}
						`}
					</style>
					<LandGrid />
					{/* <CentreCounter backgroundColor={backgroundColor} centreDelta={centreDelta} /> */}
					<Menu />
				</div>
			</GameContextProvider>
		</Web3ContextProvider>
	);
};

export default App;
