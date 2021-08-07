import React from "react";
import "../../styles/imgbutton.scss";

const ImgButton = ({ id, className, src, alt, onClick, dataname, disabled }) => {
	return (
		<button
			className={`img-btn hover-info ${className}`}
			data-name={dataname}
			disabled={disabled}
			onClick={onClick}>
			<img id={id} className={className} src={src} alt={alt} draggable="false" />
		</button>
	);
};

export default ImgButton;
