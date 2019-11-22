import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
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

let stubInitialState = {
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
        date: "2019.11.7",
        weather: { icon: "rain" },
    },
};

let mockStore = getMockStore(stubInitialState);

describe("<OutfitDetail />", () => {
    let outfitDetail, spyHistoryPush, spyAxios_delete;
    let spyAxios_get;
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
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
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
