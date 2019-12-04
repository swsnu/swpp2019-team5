import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import AddOutfit from "./AddOutfit";

let stubInitialState = {};
let mockStore = getMockStore(stubInitialState);

describe("<AddOutfit/>", () => {
    let addOutfit;
    beforeEach(() => {
        addOutfit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <AddOutfit />
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should close", () => {
        const component = mount(addOutfit);
        let wrapper = component.find("#add-outfit-button");
        wrapper.simulate("click");
        wrapper = component.find("#cancel-upload-image");
        wrapper.simulate("click");
        expect(component.find("#add-outfit").length).toBe(1);
    });
});
