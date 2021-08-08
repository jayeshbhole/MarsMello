import React from "react";
import "../../styles/card.scss";

const Card = ({ className, id, children, onClick }) => {
	return (
		<div className={`card ${className}`} id={id} onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
