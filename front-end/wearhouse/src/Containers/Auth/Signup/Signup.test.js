import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";

import "../../../setupTests";
import axios from "axios";
import Signup from "./Signup";
import { ConnectedRouter } from "connected-react-router";

var stubInitialState = { isLoggedIn: false, loginErr: "Error" };
var stubErrorState = { isLoggedIn: false, signupErr: "Error" };

var mockStore = getMockStore(stubInitialState);
var mockStore_error = getMockStore(stubErrorState);

describe("<Signup />", () => {
    let signup, spyAxios_post, spyHistoryPush;

    beforeEach(() => {
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Signup history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(signup);
        let wrapper = component.find("#signup");
        expect(wrapper.length).toBe(1);
    });

    it("should not call 'onSignup' when button is disabled", () => {
        const component = mount(signup);
        let wrapper = component.find("#signup-container #signup-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);

        component
            .find("#email-input")
            .simulate("change", { target: { value: "test" } });

        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should call 'onSignup' when input is valid", () => {
        const component = mount(signup);
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } });
        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } });
        component
            .find("#pw-confirm")
            .simulate("change", { target: { value: "testpassword" } });
        let wrapper = component.find("#signup-container #signup-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });

    it("should redirect to /browse", () => {
        mockStore = getMockStore({ isLoggedIn: true });
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Signup history={history} />
                </ConnectedRouter>
            </Provider>
        );
        mount(signup);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should display <AuthError>", () => {
        signup = (
            <Provider store={mockStore_error}>
                <ConnectedRouter history={history}>
                    <Signup history={history} />
                </ConnectedRouter>
            </Provider>
        );
        const container = mount(signup);
        let wrapper = container.find("#auth-error");
        expect(wrapper.length).toBe(1);

        let button = wrapper.find("#error-close");
        button.simulate("click");
    });
});
