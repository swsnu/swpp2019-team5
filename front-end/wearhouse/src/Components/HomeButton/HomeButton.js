import React from "react";
import { withRouter } from "react-router";

import logo from "./Logo_point.png";
import "./HomeButton.scss";

class HomeButton extends React.Component {
    render() {
        return (
            <div
                id="homebutton"
                onClick={() => {
                    this.props.onClickHome();
                }}
            >
                <img src={logo} alt="Wearhouse logo button" />
            </div>
        );
    }
}

HomeButton.propTypes = {};

export default withRouter(HomeButton);
