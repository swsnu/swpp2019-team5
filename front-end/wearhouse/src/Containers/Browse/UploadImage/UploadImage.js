import React from "react";
import { faTimes, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actionCreators from "../../../store/actions/index";

import "./UploadImage.scss";
import {connect} from "react-redux";

class UploadImage extends React.Component {
    state = { selectedImageURL: null, isPreviewMode: false };

    onClickClosePopUpButton = () => {
        this.props.onClosePopUp();
    };

    isImageFile = file => {
        return file && file["type"].split("/")[0] === "image";
    };

    onFileChanged = event => {
        if (event.target.files && event.target.files[0]) {
            if (this.isImageFile(event.target.files[0])) {
                this.setState(
                    {
                        ...this.state,
                        selectedImageURL: URL.createObjectURL(
                            event.target.files[0],
                        ),
                        isPreviewMode: true,
                    },
                    () => {
                        console.log(this.state.selectedImageURL);
                    },
                );
            } else {
                alert("you need to input image file");
                console.log(event.target.files[0]);
                console.log(this.state.selectedImageURL);
            }
        }
    };

    onChooseOtherImage = () => {
        this.setState({
            ...this.state,
            selectedImageURL: null,
            isPreviewMode: false,
        });
    };

    onConfirmImage = () => {
        const new_outfit = {
            items = [],
            image = this.state.selectedImageURL,
            date = 1,
            satisfaction = 1
        }

        //  send image to backend
        this.props.onCreateNewOutfit(new_outfit)

        // go to CreateOutfit Page
        this.props.history.push('/createOutfit')
    };

    render() {
        let chooseOtherImageButton = null;
        let confirmImageButton = null;
        let chooseFileButton = null;
        let previewImage = null;

        if (this.state.isPreviewMode) {
            chooseOtherImageButton = (
                <button
                    id="choose-other-image"
                    onClick={this.onChooseOtherImage}
                >
                    choose other image
                </button>
            );
            confirmImageButton = (
                <button id="confirm-image" onClick={this.onConfirmImage}>
                    confirm and proceed
                </button>
            );
            previewImage = (
                <img
                    id="selected-image-file"
                    src={this.state.selectedImageURL}
                    alt="selected image file"
                />
            );
        } else {
            chooseFileButton = (
                <input
                    type="file"
                    id="choose-file"
                    onChange={this.onFileChanged}
                />
            );
        }

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
                    {chooseFileButton}
                    {previewImage}
                    {chooseOtherImageButton}
                    {confirmImageButton}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewOutfit: outfit => {
            dispatch(actionCreators.createOutfit(outfit));
        },
    };
};

export default connect(
    mapDispatchToProps,
)(UploadImage);
