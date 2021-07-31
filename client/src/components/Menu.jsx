import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import "../styles/menu.scss";
import { animated } from "@react-spring/web";

const Menu = ({ xy }) => {
	return (
		<animated.div className="menu">
			<TopBar iron={0} gold={0} copper={0} titanium={0} aluminium={0} />
			<SideBar />
			<BottomBar xy={xy} />
		</animated.div>
	);
};

export default Menu;
