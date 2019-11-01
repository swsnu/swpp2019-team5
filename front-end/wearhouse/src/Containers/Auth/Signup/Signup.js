import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import "./Signup.scss";

class Signup extends Component {
    state = { password: "", passwordConfirm: "" };
    onSignUp = () => {
        //TODO: implement axios call
    };

    // onPasswordConfirm = () => {
    //     this.setState({
    //         passwordMatch: this.state.password === this.state.passwordConfirm,
    //     });
    // };

    render() {
        let visible = this.state.password === this.state.passwordConfirm;
        console.log(this.state);
        return (
            <div id="signup">
                <form id="signup-form" onSubmit={this.onSignUp()}>
                    <label>E-mail</label>
                    <input type="text" name="email" id="email-input"></input>
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
                            this.setState({ passwordConfirm: e.target.value });
                        }}
                        type="password"
                        name="password-confirm"
                        id="pw-confirm"
                    ></input>
                    {!visible && (
                        <div id="password-mismatch">Passwords don't match</div>
                    )}
                    <button
                        active={(
                            !visible && this.state.password != ""
                        ).toString()}
                        id="signup-button"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: () => dispatch(actionCreators.signUp()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signup);
