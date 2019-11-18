import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import HomeButton from "../../Components/HomeButton/HomeButton";
import Logout from "../Auth/Logout/Logout";

import "./Header.scss";

class Header extends React.Component {
    onClickLogin = () => {
        this.props.history.push("/login");
    };

    onClickSignin = () => {
        this.props.history.push("/signup");
    };

    onClickHomeButton = () => {
        if (this.props.loggedIn) {
            this.props.history.push("/browse");
        } else {
            this.props.history.push("/main");
        }
    };

    render() {
        return (
            <div id="header">
                <HomeButton onClickHome={() => this.onClickHomeButton()} />
                {this.props.loggedIn ? (
                    <Logout />
                ) : (
                    <div id="signin-box">
                        <button
                            id="login-button"
                            onClick={() => {
                                this.onClickLogin();
                            }}
                        >
                            Log In
                        </button>
                        <button
                            id="signup-button"
                            onClick={() => {
                                this.onClickSignin();
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.login.isLoggedIn,
    };
};

export default connect(
    mapStateToProps,
    null,
)(withRouter(Header));
