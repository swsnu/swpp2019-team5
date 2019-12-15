import React from "react";
import {
    faTimes /*, faCameraRetro */,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actionCreators from "../../../store/actions/index";
import Spinner from "react-spinner-material";

import "./UploadImage.scss";
import { connect } from "react-redux";

class UploadImage extends React.Component {
    state = {
        selectedImageFile: null, // binary file to send to backend
        selectedImageURL: null, // url for image file in local filesystem
        isPreviewMode: false,
        showWarning: false,
        isLoading: false,
    };

    onClickClosePopUpButton = () => {
        this.props.onClosePopUp();
    };

    isImageFile = file => {
        return file && file["type"].split("/")[0] === "image";
    };

    onFileChanged = event => {
        if (event.target.files && event.target.files[0]) {
            event.persist();
            //console.log(event);
            if (this.isImageFile(event.target.files[0])) {
                this.setState({
                    ...this.state,
                    selectedImageFile: event.target.files[0],
                    selectedImageURL: URL.createObjectURL(
                        event.target.files[0],
                    ),
                    isPreviewMode: true,
                    showWarning: false,
                });
            } else {
                this.setState({ ...this.state, showWarning: true });
            }
        }
    };

    onChooseOtherImage = () => {
        this.setState({
            ...this.state,
            selectedImageFile: null,
            selectedImageURL: null,
            isPreviewMode: false,
        });
    };

    onConfirmImage = () => {
        //
        this.setState({ isLoading: true });
        let form_data = new FormData();

        form_data.append("image", this.state.selectedImageFile);
        //console.log(this.state.selectedImageFile);
        //  send image to backend

        form_data.append("ml", this.checkbox.checked);
        this.props.onPostImage(form_data);

        //this.props.outfitData
        // redirect to create outfit page should be proceeded
        // after having received response from backend
        // so redirection logic exists at actionCreator
    };

    render() {
        let chooseOtherImageButton = null;
        let confirmImageButton = null;
        let chooseFileButton = null;
        let previewImage = null;
        let chooseMLButton = null;
        let alertMessage = null;
        let loading = null;

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
                    alt="selected file"
                />
            );
            chooseMLButton = (
                <div id="choose-ml">
                    <input
                        type="checkbox"
                        ref={input => {
                            this.checkbox = input;
                        }}
                    />
                    <label>
                        <div>Automatically detect items</div>
                        <div id="warning-message">
                            This may take some time up to 5 seconds!
                        </div>
                    </label>
                </div>
            );
            // console.log(this.state.isPreviewMode);
            // console.log(previewImage);
        } else {
            chooseFileButton = (
                <input
                    type="file"
                    id="choose-file"
                    onChange={this.onFileChanged}
                />
            );
        }

        if (this.state.showWarning) {
            alertMessage = (
                <div id="alert-message">
                    Uploaded file is not a valid image. Only JPG, JPEG, and PNG
                    are allowed
                </div>
            );
        }

        if (this.state.isLoading) {
            chooseOtherImageButton = null;
            confirmImageButton = null;
            chooseFileButton = null;
            alertMessage = null;
            previewImage = null;
            loading = (
                <Spinner
                    id="loading"
                    size={60}
                    spinnerColor={"#33333"}
                    spinnerWidth={2}
                    visible={true}
                />
            );
        }
        return (
            <div id="upload-image">
                <div className="overlay"></div>
                <div id="popup-wrapper">
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
                        {chooseMLButton}
                        {alertMessage}
                        <div className="buttons">
                            {chooseOtherImageButton}
                            {confirmImageButton}
                        </div>
                        {loading}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostImage: image => {
            dispatch(actionCreators.postImage(image));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(UploadImage);
