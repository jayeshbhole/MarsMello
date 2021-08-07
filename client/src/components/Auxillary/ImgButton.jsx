import React from "react";
import "../../styles/imgbutton.scss";

const ImgButton = ({ id, className, src, alt, onClick, dataname }) => {
	return (
		<div className={`img-btn hover-info ${className}`} data-name={dataname}>
			<img id={id} className={className} src={src} alt={alt} onClick={onClick} draggable="false" />
		</div>
	);
};

export default ImgButton;
