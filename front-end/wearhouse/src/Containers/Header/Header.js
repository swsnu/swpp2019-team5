import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import HomeButton from "../../Components/HomeButton/HomeButton";
import Logout from "../Auth/Logout/Logout";

import "./Header.scss";

class Header extends React.Component {
    componentDidMount() {
        this.props.getLogin();
    }

    shouldComponentUpdate() {
        return true;
    }
    onClickLogin = () => {
        this.props.history.push("/login");
    };

    onClickSignin = () => {
        this.props.history.push("/signup");
    };

    render() {
        return (
            <div id="header">
                <HomeButton />
                {this.props.isLoggedIn ? (
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
        isLoggedIn: state.login.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLogin: () => {
            dispatch(actionCreators.getLogin());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Header));
