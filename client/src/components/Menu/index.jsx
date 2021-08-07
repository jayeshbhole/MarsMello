import { useState } from "react";
import Docks from "./Docks";
import MiniMenu from "../MiniMenu";
import MiniModal from "../MiniModals";
import Add from "../MiniModals/Add";
import Info from "../MiniModals/Info";
import Remove from "../MiniModals/Remove";
import Buy from "../MiniModals/Buy";
import Sell from "../MiniModals/Sell";
const Menu = () => {
	const [miniModal, setMiniModalType] = useState("");
	const [isMiniOpen, setIsMiniModal] = useState(false);

	return (
		<>
			<MiniMenu setMiniModalType={setMiniModalType} setIsMiniModal={setIsMiniModal} />
			<Docks />
			{isMiniOpen && (
				<MiniModal setIsMiniModal={setIsMiniModal}>
					{miniModal === "info" && <Info />}
					{miniModal === "add" && <Add />}
					{miniModal === "rmv" && <Remove />}
					{miniModal === "buy" && <Buy />}
					{miniModal === "sell" && <Sell />}
				</MiniModal>
			)}
		</>
	);
};

export default Menu;
