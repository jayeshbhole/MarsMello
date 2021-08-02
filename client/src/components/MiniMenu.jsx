import { animated } from "@react-spring/web";
import React from "react";

const MiniMenu = (props) => {
	return (
		<animated.div class="mini" {...props}>
			Hello
		</animated.div>
	);
};
export default MiniMenu;
