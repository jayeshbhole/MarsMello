import React from "react";
import "../../styles/imgbutton.scss";

const ImgButton = ({ id, className, src, alt, onClick, dataname, disabled }) => {
	return (
		<button className={`img-btn hover-info ${className}`} data-name={dataname} disabled={disabled}>
			<img id={id} className={className} src={src} alt={alt} onClick={onClick} draggable="false" />
		</button>
	);
};

export default ImgButton;
