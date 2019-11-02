import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehBlank } from "@fortawesome/free-solid-svg-icons";

import horrible from "./icon-images/1.png";
import bad from "./icon-images/2.png";
import neutral from "./icon-images/3.png";
import good from "./icon-images/4.png";
import great from "./icon-images/5.png";

import "./Satisfaction.scss";

const Satisfaction = props => {
    let icon;
    let value = props.value;

    let iconlist = [horrible, bad, neutral, good, great];

    if (value >= 1 && value <= 5) {
        icon = <img src={iconlist[value]} alt={"satisfaction: " + value} />;
    } else {
        icon = (
            <FontAwesomeIcon
                class="null-icon"
                icon={faMehBlank}
                color="darkgray"
            />
        );
    }

    return <div className="satisfaction-icon">{icon}</div>;
};

export default Satisfaction;
