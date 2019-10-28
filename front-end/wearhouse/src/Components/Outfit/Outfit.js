import React from "react";

import Satisfaction from "../Satisfaction/Satisfaction";

import "./Outfit.scss";

const Outfit = props => {
    let style = { backgroundImage: "url(" + props.image + ")" };
    return (
        <div className="outfit-preview" onClick={props.clicked}>
            <div className="outfit-image" alt="Outfit" style={style} />
            <div className="outfit-info">
                <div className="outfit-date">2019.10.29</div>
                <Satisfaction value={props.satisfactionValue} />
            </div>
            {/* <Satisfaction value={props.satisfactionValue} /> */}
        </div>
    );
};

export default Outfit;
