import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import Browse from "./Containers/Browse/Browse";

import * as actionCreators from "./store/actions/index";

import "./App.scss";

function App() {
    return (
        <ConnectedRouter history={this.props.history}>
            <Switch>
                <Route path="/browse" exact render={() => <Browse />} />
            </Switch>
        </ConnectedRouter>
    );
}

export default App;
