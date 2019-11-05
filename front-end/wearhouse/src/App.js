import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Calendar from "./Containers/Calendar/Calendar";
import Browse from "./Containers/Browse/Browse";
import OutfitDetail from "./Containers/OutfitDetail/OutfitDetail";
import Login from "./Containers/Auth/Login/Login";
import Signup from "./Containers/Auth/Signup/Signup";
import LandingPage from "./Containers/LandingPage/LandingPage";
import CreateOutfit from "./Containers/CreateOutfit/CreateOutfit";
import "./App.scss";

class App extends React.Component {
    render() {
        let items = [
            { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
            { category: "Shoes", tags: ["black", "opentoe"] },
            { category: "LowerBody", tags: ["jeans"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
        ];
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
                    <Route
                        path="/createOutfit"
                        exact
                        render={() => (
                            <CreateOutfit
                                image={""}
                                items={items}
                                outfit_id={1}
                            />
                        )}
                    />
                    <Route path="/main" exact component={LandingPage} />
                    <Redirect exact to="/main" />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default App;
