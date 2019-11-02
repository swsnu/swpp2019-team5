import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehBlank } from "@fortawesome/free-solid-svg-icons";

import horrible from "../Satisfaction/icon-images/1.png";
import bad from "../Satisfaction/icon-images/2.png";
import neutral from "../Satisfaction/icon-images/3.png";
import good from "../Satisfaction/icon-images/4.png";
import great from "../Satisfaction/icon-images/5.png";

class EditSatisfaction extends React.Component {
    state = { currSatisfaction: this.props.satisfactionValue };
    render() {
        return (
            <div id="edit-satisfaction">
                <div id="curr"></div>
            </div>
        );
    }
}

export default EditSatisfaction;
