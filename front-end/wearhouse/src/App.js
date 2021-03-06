import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import OutfitCalendar from "./Containers/OutfitCalendar/OutfitCalendar";
import Browse from "./Containers/Browse/Browse";
import OutfitDetail from "./Containers/OutfitDetail/OutfitDetail";
import Login from "./Containers/Auth/Login/Login";
import Signup from "./Containers/Auth/Signup/Signup";
import LandingPage from "./Containers/LandingPage/LandingPage";
import CreateOutfit from "./Containers/CreateOutfit/CreateOutfit";
import EditOutfit from "./Containers/EditOutfit/EditOutfit";
import Header from "./Containers/Header/Header";

import * as actionCreators from "./store/actions/index";

import "./App.scss";

class App extends React.Component {
    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.getLogin();
        }
    }
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <Header />
                {this.props.isLoggedIn ? (
                    <Switch>
                        <Route
                            path="/outfitDetail/:id"
                            exact
                            component={OutfitDetail}
                        />
                        <Route
                            path="/calendar"
                            exact
                            component={OutfitCalendar}
                        />
                        <Route
                            path="/createOutfit"
                            exact
                            component={CreateOutfit}
                        />
                        <Route
                            path="/editOutfit/:id"
                            exact
                            component={EditOutfit}
                        />
                        <Route path="/browse" exact component={Browse} />
                        <Redirect exact to="/browse" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/main" exact component={LandingPage} />
                        <Redirect exact to="/main" />
                    </Switch>
                )}
            </ConnectedRouter>
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
)(App);
