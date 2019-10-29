import React from "react";
import { faTimes, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UploadImage.scss";

class UploadImage extends React.Component {
    state = {
        showPopUp: true,
    };

    onClickCancelButton = () => {
        // 1. flush image from server
        // 2. doNotShowPopUp
        this.setState({ ...this.state, showPopUp: false });
    };

    showPopUp = () => {
        return (
            <div id="upload-image">
                <div className="overlay"></div>
                <div id="popup-container">
                    <div id="upload-image-header">
                        <div className="header-column">
                            <div id="upload-image-title">
                                <p>Upload your outfit!</p>
                            </div>
                        </div>
                        <div className="header-column">
                            <button
                                id="cancel-upload-image"
                                onClick={this.onClickCancelButton}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    id="cancel-upload-image-icon"
                                />
                            </button>
                        </div>
                    </div>
                    <button
                        id="upload-image-button"
                        onClick={this.onClickUploadImage}
                    >
                        <FontAwesomeIcon
                            icon={faCameraRetro}
                            size="4x"
                            id="choose-image-icon"
                        />
                    </button>
                </div>
            </div>
        );
    };

    doNotShowPopUp = () => {
        return null;
    };

    render() {
        console.log(this.state.showPopUp);
        let popup = null;
        if (this.state.showPopUp) {
            popup = this.showPopUp();
        } else {
            popup = this.doNotShowPopUp();
        }
        return popup;
    }
}

export default UploadImage;
