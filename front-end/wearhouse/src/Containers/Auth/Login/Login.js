import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import "./Login.scss";

class Login extends Component {
    onLogin = () => {
        let credentials = {
            email: document.getElementById("email-input").value,
            password: document.getElementById("pw-input").value,
        };
        this.props.onLogIn(credentials);
    };

    onClickSignUp = () => {
        this.props.history.push("/signup");
    };

    render() {
        return (
            <div id="login">
                <form id="login-form">
                    <label>E-mail</label>
                    <input type="text" name="email" id="email-input"></input>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="pw-input"
                    ></input>
                </form>
                <button id="login-button" onClick={() => this.onLogin()}>
                    Log In
                </button>
                <button id="signup-button" onClick={() => this.onClickSignUp()}>
                    Sign Up
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.login.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: () => dispatch(actionCreators.logIn()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
