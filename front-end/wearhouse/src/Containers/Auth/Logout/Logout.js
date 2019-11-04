import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

import "./Logout.scss";

class Logout extends Component {
    onLogout = () => {
        this.props.onLogOut();
    };
    render() {
        return (
            <div id="logout">
                <button id="logout-button" onClick={() => this.onLogout()}>
                    Log Out
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
        onLogOut: () => dispatch(actionCreators.logOut()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Logout);
