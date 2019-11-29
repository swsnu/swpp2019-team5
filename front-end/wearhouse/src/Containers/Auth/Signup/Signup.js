import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import AuthError from "../../../Components/AuthError/AuthError";

import "./Signup.scss";

class Signup extends Component {
    state = {
        email: "",
        password: "",
        passwordConfirm: "",
        signupErrVisible: true,
    };

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push("/browse");
        }
        this.props.resetErr();
    }

    onSignUp = userCredentials => {
        this.props.resetErr();
        this.props.onSignUp(userCredentials);
        this.setState({ loginErrVisible: true });
    };

    onCloseError = () => {
        this.setState({ signupErrVisible: false });
    };

    render() {
        let pwMatch = this.state.password === this.state.passwordConfirm;

        const emailRegex = /^[^@\s]{1,}@[^@\s.]{1,}([-_.]?[^@\s.])*.[a-zA-Z]{2,}$/;
        let validEmail = emailRegex.test(this.state.email);

        let active = pwMatch && validEmail && this.state.password !== "";
        return (
            <div id="signup">
                <div id="signup-container">
                    <h1>Sign Up</h1>
                    <form id="signup-form">
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
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                            type="password"
                            name="password"
                            id="pw-input"
                        ></input>
                        <label>Password Confirmation</label>
                        <input
                            onChange={e => {
                                this.setState({
                                    passwordConfirm: e.target.value,
                                });
                            }}
                            type="password"
                            name="password-confirm"
                            id="pw-confirm"
                        ></input>
                        <div id="error-container">
                            {!validEmail && this.state.email !== "" && (
                                <div
                                    className="signup-error"
                                    id="email-invalid"
                                >
                                    Must enter a valid email address
                                </div>
                            )}
                            {!pwMatch && (
                                <div
                                    className="signup-error"
                                    id="password-mismatch"
                                >
                                    Passwords don&apos;t match
                                </div>
                            )}
                        </div>
                    </form>
                    <button
                        disabled={!active}
                        id="signup-button"
                        onClick={() =>
                            this.onSignUp({
                                email: this.state.email,
                                password: this.state.password,
                            })
                        }
                    >
                        Sign up
                    </button>
                    {this.state.signupErrVisible &&
                        (this.props.signupErr && (
                            <AuthError
                                error={this.props.signupErr}
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
        signupErr: state.login.signupErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: userCredentials =>
            dispatch(actionCreators.signUp(userCredentials)),
        resetErr: () => dispatch(actionCreators.resetErr()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signup);
