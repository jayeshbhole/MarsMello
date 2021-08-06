import React from 'react';
import "../../styles/card.scss";

const Card = ({className, children}) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    )
}

export default Card;
