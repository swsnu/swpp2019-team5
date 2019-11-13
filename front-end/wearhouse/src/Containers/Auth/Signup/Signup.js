import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import Header from "../../Header/Header";
import "./Signup.scss";

class Signup extends Component {
    state = { email: "", password: "", passwordConfirm: "" };
    onSignUp = () => {
        this.props.onSignUp();
    };

    render() {
        let pwMatch = this.state.password === this.state.passwordConfirm;

        const emailRegex = /^[^@\s]{1,}@[^@\s.]{1,}\.[a-z]{2,3}$/;
        let validEmail = emailRegex.test(this.state.email);

        let active = pwMatch && validEmail && this.state.password !== "";
        return (
            <div id="signup">
                <Header />
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
                        <button
                            disabled={!active}
                            id="signup-button"
                            onClick={() => this.onSignUp()}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: () => dispatch(actionCreators.signUp()),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Signup);
