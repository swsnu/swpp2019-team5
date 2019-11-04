import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";
//import * as actionCreators from "../../../store/actions/login";
import "../../../setupTests";
import axios from "axios";
import Logout from "./Logout";

let stubInitialState = {};

let mockStore = getMockStore(stubInitialState);

describe("<Signup />", () => {
    let logout, spyAxios_get;

    beforeEach(() => {
        logout = (
            <Provider store={mockStore}>
                <Logout history={history} />
            </Provider>
        );

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
    });

    it("should load properly", () => {
        const component = mount(logout);
        let wrapper = component.find("#logout");
        expect(wrapper.length).toBe(1);
    });

    it("should call 'onLogout' when clicked", () => {
        const component = mount(logout);
        let wrapper = component.find("#logout-button");
        wrapper.simulate("click");
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });
});
