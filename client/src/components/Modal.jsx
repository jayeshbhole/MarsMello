import React from "react";
import "../styles/modal.scss";

const Modal = ({ children, onClick }) => {
	return (
		<div className="modal-bg">
			<div className="modal">{children}</div>
		</div>
	);
};
export default Modal;
