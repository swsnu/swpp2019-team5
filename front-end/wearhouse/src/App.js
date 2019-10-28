import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import Calendar from "./Containers/Calendar/Calendar";
import Browse from "./Containers/Browse/Browse";
import OutfitDetail from "./Containers/OutfitDetail/OutfitDetail";
import CreateOutfit from "./Containers/CreateOutfit/CreateOutfit";
import "./App.scss";

function App() {
    let items = [
        { category: "Top", tags: ["black", "T-shirt", "2019"] },
        { category: "Shoes", tags: ["black", "opentoe"] },
        { category: "Bottom", tags: ["jeans"] },
        { category: "Accessories", tags: ["black", "golden-buckle"] },
    ];
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/browse" exact component={Browse} />
                <Route
                    path="/outfitDetail/:id"
                    exact
                    component={OutfitDetail}
                />
                <Route path="/calendar" exact component={Calendar} />
                <Route
                    path="/createOutfit"
                    exact
                    render={() => <CreateOutfit image={""} items={items} />}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
