import React, { Component } from "react";

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
                    <div id="add-outfit-text">ADD NEW</div>
                </button>
            </div>
        );
    }
}
export default AddOutfit;
