import React, { Component } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AddOutfit.scss";

class AddOutfit extends Component {
    onClickButton = () => {
        /*To Soyeong.. please implement here. as soon as user clicks Add outfit button 
        uploading photo should pop up*/
    };
    render() {
        return (
            <div id="add-outfit">
                <button id="add-outfit-button" onClick={this.onClickButton}>
                    <FontAwesomeIcon icon={faPlus} id="add-outfit-icon" />
                    <div id="add-outfit-text">Add New</div>
                </button>
            </div>
        );
    }
}
export default AddOutfit;
