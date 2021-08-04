import { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, config } from "@react-spring/web";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const calculateGrid = (hk, chunkCentre) => {
	return Array.from({ length: 31 }, (_, y) => {
		if (y < 5 || y >= 26) return Array.from({ length: 31 }, () => [1]);
		return Array.from({ length: 31 }, (_, x) => {
			if (x < 5 || x >= 26) return [1];
			return [x - hk[0] + chunkCentre[0], -y + hk[1] + chunkCentre[1]];
		});
	});
};

const useGame = () => {
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const cellSize = Math.max(windowWidth, windowHeight) / 10;
	const gridSize = cellSize * 31;
	const paddingSize = cellSize * 5;

	// Mini modal States
	const [isMiniOpen, setIsMiniOpen] = useState(false);
	const [miniModal, setMiniModal] = useState("");

	const hk = [15, 15];
	const centredGridOffsets = [-((gridSize - windowHeight) / 2), -((gridSize - windowWidth) / 2)];

	const localTop = parseFloat(localStorage.getItem("top")) || centredGridOffsets[0];
	const localLeft = parseFloat(localStorage.getItem("left")) || centredGridOffsets[1];

	// The centre of window in the grid
	const localCentreDelta = localStorage
		.getItem("centreDelta")
		?.split(",")
		.map((v, _) => parseInt(v)) || [0, 0];

	// Centre of the loaded chunk
	const [chunkCentre, setChunkCentre] = useState(
		localStorage
			.getItem("chunkCentre")
			?.split(",")
			.map((v) => parseInt(v)) || [0, 0]
	);
	// Grid
	const [rows, setRows] = useState(calculateGrid(hk, chunkCentre));
	const [loading, setLoading] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState(
		localStorage
			.getItem("chunkCentre")
			?.split(",")
			.map((v) => parseInt(v)) || [0, 0]
	);

	// Utility Functions
	const calculateCentre = (top, left) => {
		return [
			Math.floor((-left - paddingSize + windowWidth / 2) / cellSize) - 10,
			-Math.floor((-top - paddingSize + windowHeight / 2) / cellSize) + 10,
		];
	};
	const calculateCoOrdinates = (x, y) => {
		[x, y] = [x - chunkCentre[0], y - chunkCentre[1]];
		return [windowWidth / 2 - (x + 15.5) * cellSize, windowHeight / 2 + (y - 15.5) * cellSize];
	};
	const isOutOfBounds = (top, left) => {
		const padding = 0.7 * paddingSize;
		if (-top < padding || -top > gridSize - padding - windowHeight) return true;
		if (-left < padding || -left > gridSize - padding - windowWidth) return true;
		return false;
	};

	// HOOKS
	useEffect(() => {
		localStorage.setItem("chunkCentre", chunkCentre);
		setRows(calculateGrid(hk, chunkCentre));
		setLoading(false);
	}, [chunkCentre]);

	// Springy
	const [{ top, left, centreDelta, backgroundColor, xy }, centreApi] = useSpring(() => ({
		top: localTop,
		left: localLeft,
		centreDelta: localCentreDelta,
		xy: [chunkCentre[0] + localCentreDelta[1], chunkCentre[1] + localCentreDelta[1]],
		backgroundColor: "white",
		config: { restVelocity: 1, ...config.slow },
	}));
	const [miniMenuStyles, miniMenuApi] = useSpring(() => ({
		width: cellSize,
		height: cellSize,
		block: [0, 0],
		top: centredGridOffsets[1],
		left: centredGridOffsets[0],
		display: "none",
	}));
	const dragBind = useDrag(
		({ movement: [mx, my], tap, last }) => {
			if (loading) return;

			if (tap) {
				centreApi.stop();
				calculateCentre(top.goal, left.goal);
				return;
			} else if (last) {
				handleDragEnd(top.goal, left.goal);
				return;
			}
			miniMenuApi.set({
				display: "none",
				top: 0,
				left: 0,
			});
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

	// Misc Functions
	const teleport = (x, y) => {
		setLoading(false);
		setChunkCentre(() => {
			centreApi.set({
				top: centredGridOffsets[0],
				left: centredGridOffsets[1],
				centreDelta: [0, 0],
				backgroundColor: "white",
			});
			localStorage.setItem("top", centredGridOffsets[0]);
			localStorage.setItem("left", centredGridOffsets[1]);
			localStorage.setItem("centreDelta", [0, 0]);
			return [Math.floor(x), Math.floor(y)];
		});
	};

	// Event Handlers
	const handlePlotClick = (block, id) => {
		if (top.idle && left.idle) {
			// Centre Menu at these Co-ordinates
			const menuCentre = calculateCoOrdinates(block[0], block[1]);
			setSelectedBlock(block);
			miniMenuApi.set({
				display: "block",
				block: block,
				top: top.get() - menuCentre[1] + windowHeight / 2,
				left: left.get() - menuCentre[0] + windowWidth / 2,
			});
		}
	};

	// handle mini menu click
	const handleMiniClick = (e) => {
		setMiniModal(e.target.id);
		setIsMiniOpen(true);
	};

	return {
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
		rows,
		isMiniOpen,
		setIsMiniOpen,
		miniModal,
		selectedBlock,
		handlePlotClick,
		handleMiniClick,
		dragBind,
	};
};

export default useGame;