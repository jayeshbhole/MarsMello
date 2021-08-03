import React, { useRef, useEffect } from "react";
import "../../styles/minimodal.scss";

const MiniModal = ({ children, setIsMiniOpen }) => {
	const checkIfClickedOutside = (e) => {
		// If the menu is open and the clicked target is not within the menu,
		// then close the menu
		if (!modalRef.current.contains(e.target)) {
			setIsMiniOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, []);
	const modalRef = useRef();
	return (
		<div className="modal-bg">
			<div className="mini-modal" ref={modalRef}>
				<button onClick={() => setIsMiniOpen(false)} className="close">
					[X]
				</button>
				{children}
			</div>
		</div>
	);
};

export default MiniModal;
