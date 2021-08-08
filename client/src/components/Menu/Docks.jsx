import React, { memo, useContext, useState } from "react";

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import Modal from "../Modals/index";
import Profile from "../Modals/Profile";
import Plots from "../Modals/Plots";
import Factory from "../Modals/Factory";
import Resources from "../Modals/Resources";
import MiniModal from "../MiniModals";

import "../../styles/menu.scss";
import { GameContext } from "../../context/GameContext";

const MemoisedBottomBar = memo(BottomBar);
const MemoisedTopBar = memo(TopBar);
const MemoisedSideBar = memo(SideBar);

const Docks = () => {
	const { xy, teleport } = useContext(GameContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [avatar, setAvatar] = useState(0);
	const [x, setX] = useState("");
	const [y, setY] = useState("");
	const [isTeleModal, setIsTeleModal] = useState(false);
	const [modal, setModal] = useState("");

	const handleClick = (e) => {
		setModalVisible(true);
		setModal(e.target.id);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isNaN(x) || !isNaN(y)) {
			teleport(x, y);
			setIsTeleModal(false);
			setX("");
			setY("");
		}
	};

	return (
		<div className="menu">
			<MemoisedTopBar iron={0} gold={0} copper={0} titanium={0} aluminium={0} />
			<MemoisedBottomBar xy={xy} setModal={setIsTeleModal} />
			<MemoisedSideBar handleClick={handleClick} avatar={avatar} />
			{/* Modals */}
			{modalVisible && (
				<Modal modalVisible={modalVisible} setIsOpen={setModalVisible}>
					{modal === "profile" && <Profile avatar={avatar} setAvatar={setAvatar} />}
					{modal === "factory" && <Factory />}
					{modal === "resos" && <Resources />}
					{modal === "plots" && <Plots />}
				</Modal>
			)}
			){/* Teleport Modal */}
			{isTeleModal && (
				<MiniModal setIsMiniModal={setIsTeleModal}>
					<form>
						<div className="x input">
							<label>X: </label>
							<input
								type="number"
								id="x"
								name="x"
								value={x}
								onChange={(e) => setX(Number(e.target.value))}
								placeholder="0"
							/>
						</div>
						<div className="y input">
							<label>Y: </label>
							<input
								type="number"
								id="y"
								name="y"
								value={y}
								onChange={(e) => setY(Number(e.target.value))}
								placeholder="0"
							/>
						</div>
						<button
							className="tele-btn"
							type="submit"
							onClick={handleSubmit}
							disabled={x === undefined || y === undefined}>
							Teleport
						</button>
					</form>
				</MiniModal>
			)}
		</div>
	);
};

export default Docks;
