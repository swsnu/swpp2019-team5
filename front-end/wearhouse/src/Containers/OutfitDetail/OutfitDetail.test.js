import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import OutfitDetail from "./OutfitDetail";
import { ConnectedRouter } from "connected-react-router";

// import Item from "../../Components/Item/Item";

// jest.mock("../../Components/Item/Item", () => {
//     return jest.fn(props => {
//         return;
//     });
// });
let stubInitialState_item = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
    option_list: [
        {
            id: 1,
            category: "UpperBody",
            tags: ["T-shirt", "2019"],
        },
        {
            id: 2,
            category: "UpperBody",
            tags: ["fall", "stripe", "blue"],
        },
        {
            id: 3,
            category: "UpperBody",
            tags: ["coat", "wool", "pink"],
        },
        {
            id: 4,
            category: "UpperBody",
            tags: ["mom", "hand-made", "check-shirt"],
        },
    ],
};
let stubInitialState_outfit = {
    outfits: [
        {
            id: 1,
            items: [
                { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
                { category: "Shoes", tags: ["black", "opentoe"] },
                { category: "LowerBody", tags: ["jeans"] },
                { category: "Accessories", tags: ["black", "golden-buckle"] },
            ],
        },
    ],
    selectedOutfit: {
        id: 1,
        items: [
            { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
            { category: "Shoes", tags: ["black", "opentoe"] },
            { category: "LowerBody", tags: ["jeans"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
        ],
        satisfactionValue: 3,
        date: "2019-11-19T15",
        weather: { icon: "rain" },
    },
};

let mockStore = getMockStore(
    {},
    stubInitialState_item,
    stubInitialState_outfit,
    {},
    {},
    {},
);

describe("<OutfitDetail />", () => {
    let outfitDetail, spyHistoryPush, spyAxios_delete;
    beforeEach(() => {
        outfitDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <OutfitDetail
                        history={history}
                        match={{ params: { id: 1 } }}
                    />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });
        spyAxios_delete = jest
            .spyOn(axios, "delete")
            .mockImplementation(() => Promise.resolve({}));

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(outfitDetail);
        let wrapper = component.find("#outfit-detail");
        expect(wrapper.length).toBe(1);
    });

    it("should call onEdit", () => {
        const component = mount(outfitDetail);
        let wrapper = component.find("#button-group #edit-outfit-button").at(0);
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should call onDelete", () => {
        const component = mount(outfitDetail);
        let wrapper = component
            .find("#button-group #delete-outfit-button")
            .at(0);
        wrapper.simulate("click");
        expect(spyAxios_delete).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
