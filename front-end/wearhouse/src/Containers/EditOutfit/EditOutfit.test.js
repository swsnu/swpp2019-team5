import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";
import EditOutfit from "./EditOutfit";

let stubInitialState_outfit = {
    outfits: [],

    selectedOutfit: {
        id: 1,
        image: null,
        satisfactionValue: 3,
        date: new Date(),
        items: [
            {
                id: 1,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 2,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 3,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 4,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
        ],
        weather: {
            tempAvg: 10,
            icon: "rain",
        },
    },
};

let stubInitialState_login = {
    isLoggedin: true,
};

let stubInitialState_weather = {
    todayWeather: { temperatureHigh: 10, temperatureLow: 0 },
    selectedWeather: null,
};

let mockStore = getMockStore(
    stubInitialState_login,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_weather,
    stubInitialState_outfit,
);

describe("<EditOutfit />", () => {
    let editOutfit, spyHistoryPush, spyAxios_put;
    beforeEach(() => {
        editOutfit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <EditOutfit history={history} />
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
        const component = mount(editOutfit);
        let wrapper = component.find("#create-outfit").at(0);
        expect(wrapper.length).toBe(1);
    });

    it("set date properly", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#date-picker").at(1);
        wrapper.simulate("change", { target: { value: "2019/11/11" } });
        wrapper = component.find(editOutfit.WrappedComponent).instance();
        expect(wrapper.state.date).toBe("1");
    });

    it("should confirm edit", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#confirm-create-outfit");
        wrapper.simulate("click");
        expect(spyAxios_put).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should add item", () => {
        const component = mount(editOutfit);
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
        let confirm = component.find("#confirm-create-outfit");
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
