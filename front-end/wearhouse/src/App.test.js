import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import { connectRouter, ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import App from "./App";
import { getMockStore } from "./mocks/mocks";
import { history } from "./store/store";

const stubNullState = {};
const mockStore = getMockStore(
    stubNullState,
    stubNullState,
    stubNullState,
    stubNullState,
);

describe("App", () => {
    let app;
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
