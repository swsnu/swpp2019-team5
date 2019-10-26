import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import { connectRouter, ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import App from "./App";
import { getMockStore } from "./mocks/mocks";
import { history } from "./store/store";

describe("App", () => {
    beforeEach(() => {
        app = (
            <Provider store={mockStore}>
                <App history={history} />
            </Provider>
        );
    });
    it("should render", () => {
        const component = mount(app);
        expect(component.find("App").length).toBe(1);
    });

    it("should redirect to browse page", () => {
        history.push("/browse");
        const component = mount(app);
        expect(component.find("#browse").length).toBe(1);
    });
});
