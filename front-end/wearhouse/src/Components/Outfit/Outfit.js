import React from "react";

import Satisfaction from "../Satisfaction/Satisfaction";

import "./Outfit.scss";

const Outfit = props => {
    let style = { backgroundImage: "url(" + props.image + ")" };
    return (
        <div className="outfit-preview" onClick={props.clicked}>
            <div className="outfit-image" alt="Outfit" style={style}>
                <img src={props.image} alt="outfit" />
            </div>
            <div className="outfit-info">
                <div className="outfit-date">
                    {props.date && props.date.substring(0, 10)}
                </div>
                <Satisfaction
                    className="emoji"
                    value={props.satisfactionValue}
                />
            </div>
        </div>
    );
};

export default Outfit;
