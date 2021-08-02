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

const Menu = ({ xy }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState("");

	const handleClick = (e) => {
		setIsOpen(true);
		setModal(e.target.id);
	};

	return (
		<animated.div className="menu">
			<TopBar iron={0} gold={0} copper={0} titanium={0} aluminium={0} />
			<BottomBar xy={xy} />
			<SideBar handleClick={handleClick} />

			{/* Modals */}
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className="content">
						{modal === "profile" && <Profile />}
						{modal === "factory" && <Factory />}
						{modal === "miner" && <h1 className="miner">TBD</h1>}
						{modal === "plots" && <Plots />}
					</div>
				</Modal>
			)}
		</animated.div>
	);
};

export default Menu;
