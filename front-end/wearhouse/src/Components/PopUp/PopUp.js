import React from "react";
import "./PopUp.scss";

class PopUp extends React.Component {
    onClickClosePopUpButton = () => {
        this.props.onClosePopUp();
    };

    onConfirmImage = () => {
        // send request to backend
    };

    render() {
        return (
            <div id="upload-image">
                <div className="overlay"></div>
                <div id="popup-container">
                    <div id="header">
                        <div className="header-column">
                            <div id="title">
                                <p>{this.props.message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button
                            className="option-button"
                            onClick={this.props.onProceedCancel}
                        >
                            Yes I am sure
                        </button>
                        <button
                            className="option-button"
                            onClick={this.onClickClosePopUpButton}
                        >
                            No keep editing
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;
