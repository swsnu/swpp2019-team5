import React from "react";

import horrible from "./icon-images/1.png";
import bad from "./icon-images/2.png";
import neutral from "./icon-images/3.png";
import good from "./icon-images/4.png";
import great from "./icon-images/5.png";

import "./Satisfaction.scss";

const Satisfaction = props => {
    let icon;
    let value = props.value; /* Default satisfaction value */
    let iconlist = [horrible, bad, neutral, good, great];
    icon = iconlist[value];

    return (
        <div className="satisfaction-icon">
            <img src={icon} alt={"satisfaction: " + value} />
        </div>
    );
};

export default Satisfaction;
