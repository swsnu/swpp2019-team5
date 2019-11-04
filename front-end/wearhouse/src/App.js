import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Calendar from "./Containers/Calendar/Calendar";
import Browse from "./Containers/Browse/Browse";
import OutfitDetail from "./Containers/OutfitDetail/OutfitDetail";
import Login from "./Containers/Auth/Login/Login";
import Signup from "./Containers/Auth/Signup/Signup";
import LandingPage from "./Containers/LandingPage/LandingPage";

import "./App.scss";

class App extends React.Component {
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <Switch>
                    <Route path="/browse" exact component={Browse} />
                    <Route
                        path="/outfitDetail/:id"
                        exact
                        component={OutfitDetail}
                    />
                    <Route path="/calendar" exact component={Calendar} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />

                    <Route path="/main" exact component={LandingPage} />
                    <Redirect exact to="/main" />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default App;
