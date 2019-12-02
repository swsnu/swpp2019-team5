import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import AuthError from "../../../Components/AuthError/AuthError";

import "./Login.scss";

class Login extends Component {
    state = {
        email: "",
        password: "",
        loginErrVisible: true,
    };

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push("/browse");
        }
        this.props.resetErr();
    }

    onLogin = userCredentials => {
        this.props.resetErr();
        this.props.onLogIn(userCredentials);
        this.setState({ loginErrVisible: true });
    };

    onClickSignUp = () => {
        this.props.history.push("/signup");
    };

    onCloseError = () => {
        this.setState({ loginErrVisible: false });
    };

    render() {
        let active = this.state.email !== "" && this.state.password !== "";
        return (
            <div id="login">
                <div id="login-container">
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
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    this.onLogin(this.state);
                                }
                            }}
                        ></input>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="pw-input"
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                    this.onLogin(this.state);
                                }
                            }}
                        ></input>
                    </form>
                    <button
                        id="login-button"
                        disabled={!active}
                        onClick={() => this.onLogin(this.state)}
                    >
                        Log In
                    </button>
                    <button
                        id="signup-button"
                        onClick={() => this.onClickSignUp()}
                    >
                        Sign Up
                    </button>
                    {this.state.loginErrVisible &&
                        (this.props.loginErr && (
                            <AuthError
                                error={this.props.loginErr}
                                onClose={() => this.onCloseError()}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        loginErr: state.login.loginErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: userCredentials =>
            dispatch(actionCreators.logIn(userCredentials)),
        resetErr: () => dispatch(actionCreators.resetErr()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
