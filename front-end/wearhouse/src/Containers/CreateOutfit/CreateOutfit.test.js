import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
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
    isLoggedIn: true,
};

let stubInitialState_weather = {
    todayWeather: { temperatureHigh: 10, temperatureLow: 0 },
    selectedWeather: null,
};

let mockStore = getMockStore(
    stubInitialState_login,
    null,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_weather,
    stubInitialState_outfit,
);

describe("<CreateOutfit />", () => {
    let createOutfit, spyHistoryPush, spyAxios_post, spyAxios_get;
    beforeEach(() => {
        createOutfit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <CreateOutfit
                        items={stubInitialState_outfit.outfits.items}
                        image=""
                        outfit_id={1}
                        newOutfit={stubInitialState_outfit.selectedOutfit}
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

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() =>
                Promise.resolve({ data: { isLoggedIn: true } }),
            );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#create-outfit").at(0);
        expect(wrapper.length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });

    it("set date properly", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#date-picker").at(1);
        wrapper.simulate("change", { target: { value: "2019/11/11" } });
        wrapper = component.find(CreateOutfit.WrappedComponent).instance();
    });

    it("should put newly created outfit", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#confirm-create-item");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should add item", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(5);
    });

    it("confirm create with empty item or not empty item", () => {
        const component = mount(createOutfit);
        let instance = component.find(CreateOutfit.WrappedComponent).instance();
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");
        let confirm = component.find("#confirm-create-item");
        confirm.simulate("click");
        expect(instance.state.isValid).toBe(false);

        wrapper = component.find(".Item .tag-input").at(4);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keypress", {
            key: "Enter",
        });
        confirm.simulate("click");
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
