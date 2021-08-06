import { animated } from "@react-spring/web";
import React, { useRef, useEffect } from "react";
import "../../styles/modal.scss";

const Modal = ({ children, setIsOpen, modalVisible }) => {
	const checkIfClickedOutside = (e) => {
		// If the menu is open and the clicked target is not within the menu,
		// then close the menu
		if (!modalRef.current.contains(e.target)) {
			setIsOpen(false);
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
		<animated.div className="modal-bg">
			<div className="modal" ref={modalRef}>
				<button onClick={() => setIsOpen(false)} className="close">
					[X]
				</button>
				<div className="content">{children}</div>
			</div>
		</animated.div>
	);
};
export default Modal;
