import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import "./Login.scss";

class Login extends Component {
    state = {
        email: "",
        password: "",
    };
    onLogin = () => {
        this.props.onLogIn(this.state);
    };

    onClickSignUp = () => {
        this.props.history.push("/signup");
    };

    render() {
        let active = this.state.email !== "" && this.state.password !== "";
        return (
            <div id="login">
                <h1>Log In</h1>
                <form id="login-form">
                    <label>E-mail</label>
                    <input
                        onChange={e => {
                            this.setState({ email: e.target.value });
                        }}
                        type="text"
                        name="email"
                        id="email-input"
                    ></input>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="pw-input"
                        onChange={e => {
                            this.setState({ password: e.target.value });
                        }}
                    ></input>
                </form>
                <button
                    id="login-button"
                    disabled={!active}
                    onClick={() => this.onLogin()}
                >
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