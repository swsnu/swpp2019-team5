import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import CreateOutfit from "./CreateOutfit";
import { ConnectedRouter } from "connected-react-router";

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
    selectedWeather: { temperatureHigh: 10, temperatureLow: 0 },
};
let stubInitialState_image = {
    outfitData: {
        id: "",
        image: "",
        satisfactionValue: null,
        date: null,
        items: null,
        weather: { tempAvg: "", icon: "" },
    },
};
let mockStore = getMockStore(
    stubInitialState_login,
    stubInitialState_item,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_weather,
    stubInitialState_image,
);

describe("<CreateOutfit />", () => {
    let createOutfit, spyAxios_post, spyAxios_get;
    beforeEach(() => {
        createOutfit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <CreateOutfit image={""} history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
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
        let wrapper = component.find("#confirm-create-outfit");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should add item", () => {
        const component = mount(createOutfit);
        let instance = component.find(CreateOutfit.WrappedComponent).instance();
        console.log(instance.state.items);
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");
        component.update();
        let count = component.find(".Item");
        expect(count.length).toBe(2);
    });

    it("confirm create with empty item or not empty item", () => {
        const component = mount(createOutfit);
        let instance = component.find(CreateOutfit.WrappedComponent).instance();
        let confirm = component.find("#confirm-create-outfit");
        confirm.simulate("click");
        expect(instance.state.isValid).toBe(false);

        let wrapper = component.find(".Item .tag-input").at(0);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keyup", {
            key: "Enter",
        });
        component.update();
        confirm = component.find("#confirm-create-outfit");
        confirm.simulate("click");
    });

    it("should call onDeleteItem", () => {
        const component = mount(createOutfit);
        let wrapper = component.find(".Item .item-deleter").at(0);
        wrapper.simulate("click");
        let count = component.find(".Item");
        expect(count.length).toBe(0);

        let confirm = component.find("#confirm-create-outfit");
        confirm.simulate("click");
    });

    it("edit satisfaction valaue", () => {
        const component = mount(createOutfit);
        const button = component.find(".satisfaction-functions").at(1);
        button.simulate("click");

        const wrapper = component.find(".satisfaction-option");
        wrapper.at(0).simulate("click");
    });

    it("should set null date and selected_day_weather", () => {
        spyAxios_get = jest.spyOn(axios, "get").mockImplementation(() =>
            Promise.resolve({
                temperatureLow: 20,
                temperatureLow: -10,
                icon: "rain",
            }),
        );
        let component = mount(createOutfit);
        component
            .find("#date-picker")
            .at(0)
            .simulate("change", { target: { value: "null" } });

        component.update();
        let instance = component.find(CreateOutfit.WrappedComponent).instance();
        console.log(instance.props, "프롭스지롱");
    });
});
