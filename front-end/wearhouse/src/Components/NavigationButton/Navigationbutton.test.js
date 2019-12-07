import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

import NavigationButton from "./NavigationButton";

describe("<NavigationButton/>", () => {
    window.history.replaceState({ query: "google" }, "MOCK");
    let spyHistoryGoBack = jest
        .spyOn(history, "goBack")
        .mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });
    it("should go back when clicked", () => {
        let mockStore = getMockStore({});
        const component = mount(
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <NavigationButton buttonName="test" history={history} />,
                </ConnectedRouter>
            </Provider>,
        );
        let wrapper = component.find(".navigation-button");
        wrapper.simulate("click");
        expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    });
});
