import React, { Component } from "react";
import UploadImage from "../../Containers/Browse/UploadImage/UploadImage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AddOutfit.scss";

class AddOutfit extends Component {
    state = {
        showPopUp: false,
    };

    onClickButton = () => {
        this.setState({ ...this.state, showPopUp: true });
    };

    render() {
        let pop_up = "";
        if (this.state.showPopUp) {
            pop_up = <UploadImage />;
        }
        return (
            <div id="add-outfit">
                {pop_up}
                <button id="add-outfit-button" onClick={this.onClickButton}>
                    <FontAwesomeIcon icon={faPlus} id="add-outfit-icon" />
                    <div id="add-outfit-text">Add New</div>
                </button>
            </div>
        );
    }
}
export default AddOutfit;
