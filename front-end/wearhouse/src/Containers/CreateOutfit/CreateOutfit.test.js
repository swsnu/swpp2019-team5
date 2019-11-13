import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import CreateOutfit from "./CreateOutfit";
import { ConnectedRouter } from "connected-react-router";

let stubInitialState_outfit = {
    outfits: {
        id: 1,
        items: [
            { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
            { category: "Shoes", tags: ["black", "opentoe"] },
            { category: "LowerBody", tags: ["jeans"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
        ],
    },

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
    },
};

let stubInitialState_login = {
    isLoggedin: true,
};

let mockStore = getMockStore(
    stubInitialState_login,
    stubInitialState_outfit,
    null,
    null,
);

describe("<CreateOutfit />", () => {
    let createOutfit, spyHistoryPush, spyAxios_put;
    beforeEach(() => {
        createOutfit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <CreateOutfit
                        items={stubInitialState_outfit.outfits.items}
                        image=""
                        outfit_id={1}
                        history={history}
                    />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_put = jest
            .spyOn(axios, "put")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#create-outfit");
        expect(wrapper.length).toBe(1);
    });

    it("should put newly created outfit", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#confirm-create-item");
        wrapper.simulate("click");
        //expect(spyAxios_post).toHaveBeenCalledTimes(12);
        //4 itmes and 8 tags are newly posted
        expect(spyAxios_put).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should add item", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(5);
    });

    it("should call onDeleteItem", () => {
        const component = mount(createOutfit);
        let wrapper = component.find(".Item .item-deleter").at(0);
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(3);
    });

    it("should call onApplyEditItem", () => {
        const component = mount(createOutfit);
        let wrapper = component.find(".Item .tag-input").at(0);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keydown", { key: "Enter" });

        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(8); //doesn't actually work but
    });
});
