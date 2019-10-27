import React, { Component } from "react";

class AddOutfit extends Component {
    onClickButton = () => {
        /*To Soyeong.. please implement here. as soon as user clicks Add outfit button 
        uploading photo should pop up*/
    };
    render() {
        return (
            <div id="add-outfit">
                <button id="add-outfit-button" onClick={this.onClickButton}>
                    Add Outfit
                </button>
            </div>
        );
    }
}
export default AddOutfit;
