import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMehBlank,
    faPen,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./EditSatisfaction.scss";
import horrible from "../Satisfaction/icon-images/1.png";
import bad from "../Satisfaction/icon-images/2.png";
import neutral from "../Satisfaction/icon-images/3.png";
import good from "../Satisfaction/icon-images/4.png";
import great from "../Satisfaction/icon-images/5.png";

class EditSatisfaction extends React.Component {
    state = {
        currSatisfaction: this.props.satisfactionValue,
        editMode: false,
    };

    render() {
        let iconlist = [horrible, bad, neutral, good, great];
        let iconOptions = iconlist.map(icon => {
            return (
                <img
                    key={icon}
                    className="satisfaction-option"
                    src={icon}
                    alt={"Satisfaction level:"}
                />
            );
        });
        let selectedIcon;
        if (typeof this.state.currSatisfaction === "number") {
            selectedIcon = iconlist[this.state.currSatisfaction];
        } else {
            selectedIcon = <FontAwesomeIcon icon={faMehBlank} />;
        }
        return (
            <div id="edit-satisfaction">
                <div id="current-value" className="visible">
                    {selectedIcon}
                </div>
                <div id="edit-options">{iconOptions}</div>
                {this.state.editMode ? (
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => {
                            this.setState({ editMode: false });
                            document
                                .getElementById("edit-options")
                                .classList.toggle("visible");
                            document
                                .getElementById("current-value")
                                .classList.toggle("visible");
                        }}
                        color="white"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => {
                            this.setState({ editMode: true });
                            document
                                .getElementById("edit-options")
                                .classList.toggle("visible");
                            document
                                .getElementById("current-value")
                                .classList.toggle("visible");
                        }}
                        color="white"
                    />
                )}
            </div>
        );
    }
}

export default EditSatisfaction;
