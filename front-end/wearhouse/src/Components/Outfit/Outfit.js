import React from "react";

import Satisfaction from "../Satisfaction/Satisfaction";

import "./Outfit.scss";

const Outfit = props => {
    return (
        <div className="outfit-preview" onClick={props.clicked}>
            <img className="outfit-image" alt="Outfit" src={props.imageUrl} />
            <Satisfaction value={props.satisfactionValue} />
        </div>
    );
};

export default Outfit;
