import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class Login extends Component {
    onLogin = () => {
        let credentials = {
            email: document.getElementById("email-input").value,
            password: document.getElementById("pw-input").value,
        };
        this.props.onLogIn(credentials);
    };

    render() {
        return (
            <div id="login">
                <form id="login-form">
                    <label>E-mail</label>
                    <input type="text" name="email" id="email-input"></input>
                    <label>Password</label>
                    <input type="text" name="password" id="pw-input"></input>
                    <button onClick={() => this.onLogin()}>Log in</button>
                </form>
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
