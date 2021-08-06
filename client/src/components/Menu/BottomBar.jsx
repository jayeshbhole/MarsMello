import { animated } from "@react-spring/web";
import ImgButton from "../Auxillary/ImgButton";

const BottomBar = ({ xy, setModal }) => {
	return (
		<div className="bottombar bar">
			<div className="x-cord cords">
				X, Y: (<animated.span>{xy}</animated.span>)
			</div>
			<ImgButton
				id="teleport"
				dataname="Teleport"
				className="teleport"
				src="./assets/img/teleport.png"
				alt="teleport"
				onClick={() => setModal(true)}
			/>
		</div>
	);
};

export default BottomBar;
