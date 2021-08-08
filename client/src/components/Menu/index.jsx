import { useState } from "react";
import Docks from "./Docks";
import MiniMenu from "../MiniMenu";
import Add from "../MiniModals/Add";
import Info from "../MiniModals/Info";
import Remove from "../MiniModals/Remove";
import Buy from "../MiniModals/Buy";
import Sell from "../MiniModals/Sell";
import Modal from "../Modals/index";
const Menu = () => {
	const [modal, setModalType] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<MiniMenu setModalType={setModalType} setIsModalOpen={setIsModalOpen} />
			<Docks />
			{isModalOpen && (
				<Modal className="mini-menu-modal" setIsOpen={setIsModalOpen}>
					{modal === "info" && <Info />}
					{modal === "add" && <Add />}
					{modal === "rmv" && <Remove />}
					{modal === "buy" && <Buy />}
					{modal === "sell" && <Sell />}
				</Modal>
			)}
		</>
	);
};

export default Menu;
