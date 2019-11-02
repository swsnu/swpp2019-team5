import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import Calendar from "./Containers/Calendar/Calendar";
import Browse from "./Containers/Browse/Browse";
import OutfitDetail from "./Containers/OutfitDetail/OutfitDetail";
<<<<<<< HEAD
import CreateOutfit from "./Containers/CreateOutfit/CreateOutfit";
=======
import Login from "./Containers/Auth/Login/Login";
import Signup from "./Containers/Auth/Signup/Signup";

>>>>>>> master
import "./App.scss";

function App() {
    let items = [
        { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
        { category: "Shoes", tags: ["black", "opentoe"] },
        { category: "LowerBody", tags: ["jeans"] },
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
<<<<<<< HEAD
                <Route
                    path="/createOutfit"
                    exact
                    render={() => <CreateOutfit image={""} items={items} />}
                />
=======
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
>>>>>>> master
            </Switch>
        </BrowserRouter>
    );
}

export default App;
