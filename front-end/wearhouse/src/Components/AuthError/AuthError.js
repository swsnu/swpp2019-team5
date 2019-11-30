import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AuthError.scss";

const AuthError = props => {
    return (
        <div id="auth-error">
            <div id="error-message">{props.error}</div>
            <div id="error-close" onClick={props.onClose}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    );
};

export default AuthError;
