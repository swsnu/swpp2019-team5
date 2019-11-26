import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import Header from "./Header";

var stubInitialState = { isLoggedIn: false, userID: null };

var mockStore = getMockStore(stubInitialState, {}, {}, {}, {}, {});

describe("<Header />", () => {
    let spyHistoryPush;
    let header, header_login;
    beforeEach(() => {
        header = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Header history={history} />
                </ConnectedRouter>
            </Provider>
        );

        var stubInitialState_login = { isLoggedIn: true };
        var mockStore_login = getMockStore(
            stubInitialState_login,
            {},
            {},
            {},
            {},
        );
        header_login = (
            <Provider store={mockStore_login}>
                <ConnectedRouter history={history}>
                    <Header history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly", () => {
        const component = mount(header);
        let wrapper = component.find("#header");
        expect(wrapper.length).toBe(1);
    });

    it("should redirect when login button is clicked", () => {
        const component = mount(header);
        let wrapper = component.find("#login-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect when signup button is clicked", () => {
        const component = mount(header);
        let wrapper = component.find("#signup-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should show logout button", () => {
        const component = mount(header_login);
        let wrapper = component.find("#logout");
        expect(wrapper.length).toBe(1);
    });

    it("should redirect when button is clicked and logged in", () => {
        const component = mount(header_login);
        let wrapper = component.find("HomeButton");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect when button is clicked", () => {
        const component = mount(header);
        let wrapper = component.find("HomeButton");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
