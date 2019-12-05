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
        editMode: "",
    };

    changeSelectedTo = number => {
        this.setState({ currSatisfaction: number });
        this.props.change(number);
    };

    render() {
        let iconlist = [horrible, bad, neutral, good, great];
        let iconOptions = [];
        for (var i = 0; i < 5; i++) {
            let j = i + 1;
            iconOptions.push(
                <img
                    key={i}
                    className={
                        j === this.state.currSatisfaction
                            ? "satisfaction-option selected"
                            : "satisfaction-option"
                    }
                    src={iconlist[i]}
                    alt={"Satisfaction level: " + j}
                    onClick={() => this.changeSelectedTo(j)}
                />,
            );
        }
        let selectedIcon;
        if (typeof this.state.currSatisfaction === "number") {
            selectedIcon = (
                <img
                    src={iconlist[this.state.currSatisfaction - 1]}
                    alt={"selected satisfaction"}
                    id="selected-satisfaction"
                />
            );
        } else {
            selectedIcon = (
                <FontAwesomeIcon
                    className="null-icon"
                    color="darkgray"
                    icon={faMehBlank}
                />
            );
        }
        return (
            <div id="edit-satisfaction">
                <div id="current-value" className="visible">
                    {selectedIcon}
                </div>
                <div id="edit-options" className={this.state.editMode}>
                    {iconOptions}
                </div>
                {this.state.editMode ? (
                    <FontAwesomeIcon
                        className="satisfaction-functions"
                        icon={faChevronLeft}
                        onClick={() => {
                            this.setState({ editMode: "" });
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        className="satisfaction-functions"
                        icon={faPen}
                        onClick={() => {
                            this.setState({ editMode: "visible" });
                        }}
                    />
                )}
            </div>
        );
    }
}

export default EditSatisfaction;
