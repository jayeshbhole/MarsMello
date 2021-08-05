import React, { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import "../../styles/menu.scss";
import { animated } from "@react-spring/web";
import Modal from "../Modals/index";
import Profile from "../Modals/Profile";
import Plots from "../Modals/Plots";
import Factory from "../Modals/Factory";
import MiniModal from "../MiniModals";

const Menu = ({ xy, teleport }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [avatar, setAvatar] = useState(0);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [isTeleModal, setIsTeleModal] = useState(false);
	const [modal, setModal] = useState("");

	const handleClick = (e) => {
		setIsOpen(true);
		setModal(e.target.id);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		teleport(x, y);
		setIsTeleModal(false);
		setX(0);
		setY(0);
		// console.log(x, y);
	};

	return (
		<animated.div className="menu">
			<TopBar iron={0} gold={0} copper={0} titanium={0} aluminium={0} />
			<BottomBar xy={xy} setModal={setIsTeleModal} />
			<SideBar handleClick={handleClick} avatar={avatar} />

			{/* Modals */}
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className="content">
						{modal === "profile" && <Profile avatar={avatar} setAvatar={setAvatar} />}
						{modal === "factory" && <Factory />}
						{modal === "miner" && <h1 className="miner">TBD</h1>}
						{modal === "plots" && <Plots />}
					</div>
				</Modal>
			)}

			{/* Teleport Modal */}
			{isTeleModal && (
				<MiniModal setIsMiniOpen={setIsTeleModal}>
					<form>
						<div className="x input">
							<label for="x">X: </label>
							<input
								type="number"
								id="x"
								name="x"
								value={x}
								onChange={(e) => setX(e.target.value)}
							/>
						</div>
						<div className="y input">
							<label for="y">Y: </label>
							<input
								type="number"
								id="y"
								name="y"
								value={y}
								onChange={(e) => setY(e.target.value)}
							/>
						</div>
						<button className="tele-btn" type="submit" onClick={handleSubmit}>
							Teleport
						</button>
					</form>
				</MiniModal>
			)}
		</animated.div>
	);
};

export default Menu;
