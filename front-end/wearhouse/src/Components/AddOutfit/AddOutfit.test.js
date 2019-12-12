import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import AddOutfit from "./AddOutfit";

let stubInitialState = {};

let stubInitialState_image = {
    outfitData: {
        id: "",
        image: "",
        satisfactionValue: null,
        date: "2019-11-07T04",
        items: [{ category: "Outer", tags: [] }],
        weather: { tempAvg: "", icon: "" },
    },
};
let mockStore = getMockStore(
    stubInitialState,
    stubInitialState,
    stubInitialState,
    stubInitialState,
    stubInitialState,
    stubInitialState_image,
);

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
