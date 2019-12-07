import React from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

import "./NavigationButton.scss";

class NavigationButton extends React.Component {
    render() {
        return (
            <div
                className="navigation-button"
                onClick={() => {
                    this.props.history.goBack();
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} /> {this.props.buttonName}
            </div>
        );
    }
}

export default withRouter(NavigationButton);
