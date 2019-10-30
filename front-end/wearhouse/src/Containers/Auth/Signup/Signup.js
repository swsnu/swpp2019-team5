import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class Signup extends Component {
    onSignUp = () => {
        //TODO: implement axios call
    };
    render() {
        return (
            <div id="signup">
                <form onSubmit={this.onSignUp()}>
                    <label>E-mail</label>
                    <input type="text" name="email" id="email-input"></input>
                    <label>Password</label>
                    <input type="text" name="password" id="pw-input"></input>
                    <label>Password Confirmation</label>
                    <input
                        type="text"
                        name="password-confirm"
                        id="pw-confirm"
                    ></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
    return {
        //onGetLogin: () => dispatch(actionCreators.getLogin()),
        //onLogIn: () => dispatch(actionCreators.logIn()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signup);
