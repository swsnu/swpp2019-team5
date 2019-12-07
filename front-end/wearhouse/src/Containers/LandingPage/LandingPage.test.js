import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";

import LandingPage from "./LandingPage";
import { ConnectedRouter } from "connected-react-router";

var stubInitialState = { isLoggedIn: false, userID: null };

var mockStore = getMockStore(stubInitialState, {}, {}, {}, {}, {});

describe("<LandingPage />", () => {
    let landingPage;
    beforeEach(() => {
        landingPage = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <LandingPage history={history} />
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly", () => {
        const component = mount(landingPage);
        let wrapper = component.find("#Main");
        expect(wrapper.length).toBe(1);
    });
});
