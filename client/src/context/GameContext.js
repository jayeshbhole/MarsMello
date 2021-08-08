import { useState, useEffect, createContext, useContext } from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, config } from "@react-spring/web";
import { useLazyQuery, gql } from "@apollo/client";
import useInterval from "../hooks/useInterval";
import { Web3Context } from "./Web3Context";

const initWindowHeight = window.innerHeight;
const initWindowWidth = window.innerWidth;
const initCellSize = Math.max(initWindowWidth, initWindowHeight) / 10;
const initGridSize = initCellSize * 31;
const initLocalCentreDelta = localStorage
	.getItem("centreDelta")
	?.split(",")
	.map((v, _) => parseInt(v)) || [0, 0];
const initChunkCentre = localStorage
	.getItem("chunkCentre")
	?.split(",")
	.map((v) => parseInt(v)) || [0, 0];
const centredGridOffsets = [
	-((initGridSize - initWindowHeight) / 2),
	-((initGridSize - initWindowWidth) / 2),
];

const GameContext = createContext({
	top: parseFloat(localStorage.getItem("top")) || centredGridOffsets[1],
	left: parseFloat(localStorage.getItem("left")) || centredGridOffsets[0],
	centreDelta: initLocalCentreDelta,
	chunkCentre: initChunkCentre,
	miniMenuStyles: {},
	xy: [initChunkCentre[0] + initLocalCentreDelta[0], initChunkCentre[1] + initLocalCentreDelta[1]],
	backgroundColor: "white",
	cellSize: initCellSize,
	gridData: {},
	miniMenuApi: {},
	closeMiniMenu: () => {},
	selectedBlock: () => {},
	handlePlotClick: () => {},
	handleMiniClick: () => {},
	dragBind: () => {},
	setIsMiniModal: () => {},
	teleport: () => {},
});

const GameContextProvider = (props) => {
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const cellSize = Math.max(windowWidth, windowHeight) / 10;
	const gridSize = cellSize * 31;
	const paddingSize = cellSize * 5;

	// Mini modal States

	const centredGridOffsets = [-((gridSize - windowHeight) / 2), -((gridSize - windowWidth) / 2)];

	const localTop = parseFloat(localStorage.getItem("top")) || centredGridOffsets[0];
	const localLeft = parseFloat(localStorage.getItem("left")) || centredGridOffsets[1];

	// The centre of window in the grid
	const localCentreDelta = localStorage
		.getItem("centreDelta")
		?.split(",")
		.map((v, _) => parseInt(v)) || [0, 0];

	// Utility Functions
	const calculateCentre = (top, left) => {
		return [
			Math.floor((-left - paddingSize + windowWidth / 2) / cellSize) - 10,
			-Math.floor((-top - paddingSize + windowHeight / 2) / cellSize) + 10,
		];
	};
	const calculateBlockOffsets = (x, y) => {
		[x, y] = [x - chunkCentre[0], y - chunkCentre[1]];
		return [windowWidth / 2 - (x + 15.5) * cellSize, windowHeight / 2 + (y - 15.5) * cellSize];
	};
	const isOutOfBounds = (top, left) => {
		const padding = 0.7 * paddingSize;
		if (-top < padding || -top > gridSize - padding - windowHeight) return true;
		if (-left < padding || -left > gridSize - padding - windowWidth) return true;
		return false;
	};

	// Centre of the loaded chunk
	const [chunkCentre, setChunkCentre] = useState(
		localStorage
			.getItem("chunkCentre")
			?.split(",")
			.map((v) => parseInt(v)) || [0, 0]
	);
	// Grid
	const [loading, setLoading] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState(
		localStorage
			.getItem("chunkCentre")
			?.split(",")
			.map((v) => parseInt(v)) || [0, 0]
	);

	// HOOKS
	useEffect(() => {
		localStorage.setItem("chunkCentre", chunkCentre);
		setLoading(false);
	}, [chunkCentre]);

	// Springy
	const [{ top, left, centreDelta, backgroundColor, xy }, centreApi] = useSpring(() => ({
		top: localTop,
		left: localLeft,
		centreDelta: localCentreDelta,
		xy: [chunkCentre[0] + localCentreDelta[0], chunkCentre[1] + localCentreDelta[1]],
		backgroundColor: "white",
		config: { restVelocity: 1, ...config.slow },
	}));
	const [miniMenuStyles, miniMenuApi] = useSpring(() => ({
		width: cellSize,
		height: cellSize,
		block: [0, 0],
		top: centredGridOffsets[1],
		left: centredGridOffsets[0],
	}));
	const dragBind = useDrag(
		({ movement: [mx, my], tap, last }) => {
			if (loading) return;

			if (tap) {
				centreApi.stop();
				calculateCentre(top.goal, left.goal);
				return;
			} else {
				setSelectedBlock();
				miniMenuApi.set({
					top: -2 * cellSize,
					left: -2 * cellSize,
				});
			}
			if (last) {
				handleDragEnd(top.goal, left.goal);
				return;
			} else {
				centreApi.start({
					top: my,
					left: mx,
				});
				const newCentreDelta = calculateCentre(top.goal, left.goal);
				centreApi.set({
					centreDelta: newCentreDelta,
					xy: [chunkCentre[0] + newCentreDelta[0], chunkCentre[1] + newCentreDelta[1]],
					backgroundColor: isOutOfBounds(top.goal, left.goal) ? "red" : "white",
				});
			}
		},
		{ initial: () => [left.get(), top.get()] }
	);

	// Player Movements
	const handleDragEnd = (draggedTop, draggedLeft) => {
		if (isOutOfBounds(draggedTop, draggedLeft)) {
			(async function () {
				// Stall the dragging
				setLoading(true);
				while (true) {
					if (!top.idle || !left.idle) await sleep(500);
					else break;
				}

				const newCentreDelta = calculateCentre(draggedTop, draggedLeft);
				// Displacement of current centred block from the window centre
				const displacement = [
					draggedTop - (windowHeight / 2 + (newCentreDelta[1] - 15.5) * cellSize),
					draggedLeft - (windowWidth / 2 - (newCentreDelta[0] + 15.5) * cellSize),
				];
				const newOffsets = [
					centredGridOffsets[0] + displacement[0],
					centredGridOffsets[1] + displacement[1],
				];

				// Set the chunk centre to the block at the centre of the screen
				setChunkCentre((curChunkCentre) => {
					const newChunkCentre = [
						newCentreDelta[0] + curChunkCentre[0],
						newCentreDelta[1] + curChunkCentre[1],
					];
					// Reset Top, Left to adjust to grid centre
					centreApi.set({
						top: newOffsets[0],
						left: newOffsets[1],
					});
					return newChunkCentre;
				});
				centreApi.set({
					centreDelta: [0, 0],
					backgroundColor: "white",
				});
				loadGridFromCentre(...chunkCentre);

				localStorage.setItem("top", newOffsets[0]);
				localStorage.setItem("left", newOffsets[1]);
				localStorage.setItem("centreDelta", [0, 0]);
			})();
		} else {
			const newCentreDelta = calculateCentre(draggedTop, draggedLeft);
			// Set Window Centre relative to grid
			centreApi.set({
				centreDelta: newCentreDelta,
				backgroundColor: "white",
				xy: [chunkCentre[0] + newCentreDelta[0], chunkCentre[1] + newCentreDelta[1]],
			});
			localStorage.setItem("top", draggedTop);
			localStorage.setItem("left", draggedLeft);
			localStorage.setItem("centreDelta", newCentreDelta);
		}
	};

	// Querying Data
	const { account } = useContext(Web3Context);
	const [loadGrid, { data: gridData }] = useLazyQuery(GET_LANDS_QUERY);

	const loadGridFromCentre = (x, y) => {
		loadGrid({ variables: { x1: x - 10, x2: x + 10, y1: y - 10, y2: y + 10 } });
	};

	useEffect(() => {
		loadGridFromCentre(...chunkCentre);
	}, [account]);
	const [grid, setGrid] = useState();

	useInterval(() => {
		loadGridFromCentre(...chunkCentre);
	}, 10000);

	useEffect(() => {
		if (gridData)
			setGrid(() => {
				const newGrid = {};
				for (const cell of gridData.lands) {
					newGrid[cell.id] = cell;
				}
				// console.log(newGrid);
				return newGrid;
			});
	}, [gridData]);

	useEffect(() => {
		console.log("Grid Data", gridData?.lands);
	}, [gridData]);

	const teleport = (x = 0, y = 0) => {
		closeMiniMenu();
		loadGridFromCentre(x, y);
		centreApi.set({
			top: centredGridOffsets[0],
			left: centredGridOffsets[1],
			centreDelta: [0, 0],
			xy: [x, y],
			backgroundColor: "white",
		});
		setChunkCentre([x, y]);
		miniMenuApi.set({});

		localStorage.setItem("top", centredGridOffsets[0]);
		localStorage.setItem("left", centredGridOffsets[1]);
		localStorage.setItem("centreDelta", [0, 0]);
	};

	// Event Handlers
	const handlePlotClick = (cellData, id) => {
		if (top.idle && left.idle) {
			// Centre Menu at these Co-ordinates
			const menuCentre = calculateBlockOffsets(cellData.x, cellData.y);
			setSelectedBlock(cellData);
			miniMenuApi.set({
				top: top.get() - menuCentre[1] + windowHeight / 2,
				left: left.get() - menuCentre[0] + windowWidth / 2,
			});
		}
	};
	const closeMiniMenu = () => {
		setSelectedBlock();
		miniMenuApi.set({
			top: -2 * cellSize,
			left: -2 * cellSize,
		});
	};

	// handle mini menu click

	return (
		<GameContext.Provider
			value={{
				teleport,
				top,
				left,
				centreDelta,
				chunkCentre,
				miniMenuStyles,
				xy,
				backgroundColor,
				miniMenuApi,
				cellSize,
				gridData: grid,
				closeMiniMenu,
				selectedBlock,
				handlePlotClick,
				dragBind,
			}}>
			{props.children}
		</GameContext.Provider>
	);
};

// Queries
const GET_LANDS_QUERY = gql`
	query GetLands($x1: Int!, $x2: Int!, $y1: Int!, $y2: Int!) {
		lands(where: { x_gte: $x1, x_lte: $x2, y_gte: $y1, y_lte: $y2 }) {
			id
			x
			y
			owner {
				id
			}
			seed
			factory {
				id
				type
				name
			}
		}
	}
`;

// Utils
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export { GameContext, GameContextProvider };
