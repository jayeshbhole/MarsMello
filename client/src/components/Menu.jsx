import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import "../styles/menu.scss";

const Menu = () => {
	return (
		<div className="menu">
			<TopBar iron={0} gold={0} copper={0} titanium={0} aluminium={0} />
			<SideBar />
			<BottomBar x={0.0} y={0.0} />
		</div>
	);
};

export default Menu;
