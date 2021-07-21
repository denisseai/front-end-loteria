import React from 'react';

const Card = (props) => {
    return (
        <div className="card">
            {/* <h3>{props.title}</h3> */}
            <img onClick={props.onCardClick} src={props.url} alt={props.title}/>
        </div>
    );
};
export default Card;