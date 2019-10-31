import React from "react";
import { faTimes, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UploadImage.scss";

class UploadImage extends React.Component {
    state = { selectedImageURL: null };

    onClickClosePopUpButton = () => {
        // 1. flush image from server
        // 2. doNotShowPopUp
        this.props.onClosePopUp();
    };

    onFileChanged = event => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                selectedImageURL: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    render() {
        let src = "#";

        console.log(src);
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
                                onClick={this.onClickClosePopUpButton}
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
                    <input
                        type="file"
                        id="choose-file"
                        onChange={this.onFileChanged}
                    />

                    <img
                        id="selected-image-file"
                        src={this.state.selectedImageURL}
                        alt="selected image file"
                    />
                </div>
            </div>
        );
    }
}

export default UploadImage;
