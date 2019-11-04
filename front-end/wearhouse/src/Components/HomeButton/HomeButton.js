import React from "react";
import { withRouter } from "react-router";

import logo from "./Logo_point.png";
import "./HomeButton.scss";

class HomeButton extends React.Component {
    onClickHomeButton = () => {
        this.props.history.push("/main");
    };

    render() {
        return (
            <div
                id="homebutton"
                onClick={() => {
                    this.onClickHomeButton();
                }}
            >
                <img src={logo} alt="Wearhouse logo button" />
            </div>
        );
    }
}

HomeButton.propTypes = {};

export default withRouter(HomeButton);
