import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Docks from "./Docks";
import MiniMenu from "../MiniMenu";
import MiniModal from "../MiniModals";
const Menu = () => {
	const { isMiniOpen, setIsMiniModal, miniModal } = useContext(GameContext);
	return (
		<>
			<Docks />
			<MiniMenu />
			{isMiniOpen && (
				<MiniModal setIsMiniModal={setIsMiniModal}>
					<h1>{miniModal}</h1>
				</MiniModal>
			)}
		</>
	);
};

export default Menu;
