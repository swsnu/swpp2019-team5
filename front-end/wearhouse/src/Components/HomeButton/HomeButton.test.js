import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import HomeButton from "./HomeButton";

var stubInitialState = {};
var mockStore = getMockStore(stubInitialState);

describe("<HomeButton />", () => {
    let home, spyHistoryPush;
    beforeEach(() => {
        home = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <HomeButton history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(td => {
            return dispatch => {};
        });
    });

    it("should render properly", () => {
        const component = mount(home);
        let wrapper = component.find("#homebutton");
        expect(wrapper.length).toBe(1);
    });

    it("should redirect when  button is clicked", () => {
        const component = mount(home);
        let wrapper = component.find("#homebutton");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
