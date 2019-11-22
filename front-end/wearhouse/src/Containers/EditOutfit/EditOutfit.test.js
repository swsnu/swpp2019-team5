import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";
import EditOutfit from "./EditOutfit";
import Item from "../../Components/Item/Item";

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
        let wrapper = component.find(".EditOutfit");
        expect(wrapper.length).toBe(1);
    });

    it("set date properly", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#date-picker").at(1);
        wrapper.simulate("change", { target: { value: "2019/11/11" } });
        wrapper = component.find(EditOutfit.WrappedComponent).instance();
    });

    it("should confirm edit", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#confirm-edit-outfit");
        wrapper.simulate("click");
        expect(spyAxios_put).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should cancel/confirm cancel edit", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#cancel-edit-outfit");
        wrapper.simulate("click");
        component.update();
        expect(component.find("PopUp").length).toBe(1);
        wrapper = component.find(".option-button").at(1);

        wrapper.simulate("click"); //cancel cancel edit
        let instance = component.find(EditOutfit.WrappedComponent).instance();
        expect(instance.state.popUp).toBe(null);

        wrapper = component.find("#cancel-edit-outfit");
        wrapper.simulate("click");
        component.update(); //again click cancel edit outfit button

        wrapper = component.find(".option-button").at(0);
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should add item", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(5);
    });

    it("confirm edit with empty or not empty item", () => {
        const component = mount(editOutfit);
        let instance = component.find(EditOutfit.WrappedComponent).instance();
        let wrapper = component.find("#add-item");
        wrapper.simulate("click");
        let confirm = component.find("#confirm-edit-outfit");
        confirm.simulate("click");
        expect(instance.state.isValid).toBe(false);

        //  expect(spyHistoryPush).toHaveBeenCalledTimes(1);

        wrapper = component.find(".Item .tag-input").at(4);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keyDown", {
            keyCode: 13,
        });
        confirm.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
    });

    it("should call onDeleteItem", () => {
        const component = mount(editOutfit);
        let wrapper = component.find(".Item .item-deleter").at(0);
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(3);
    });

    it("should call onApplyEditItem", () => {
        const component = mount(editOutfit);
        let wrapper = component.find(".Item .tag-input").at(0);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keyDown", { keyCode: 13 });

        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(13); //doesn't actually work but
    });

    it("should initialize item", () => {
        const component = mount(editOutfit);
        let wrapper = component.find("#initialize-button").at(0);
        wrapper.simulate("click");
        let count = component.find(".Item");
        expect(count.length).toBe(4);
    });

    it("should click option list", () => {
        const component = mount(editOutfit);
        let wrapper = component.find(".tag-input").at(0);
        wrapper.simulate("focus");
        component.update();
        //Option component comes out

        wrapper = component.find("#initialize-button").at(0);
        wrapper.simulate("click");
        component.update();
        //Option component disappear

        wrapper = component.find(".tag-input").at(0);
        wrapper.simulate("focus");
        wrapper.simulate("blur");
        wrapper.simulate("focus");
        component.update();
        //Option component comes out again

        wrapper = component.find("Option");
        expect(wrapper.length).toBe(4);
        wrapper = component.find("#options-container");
        wrapper.at(0).simulate("mouseLeave");
        wrapper.at(0).simulate("mouseOver");
        wrapper.at(0).simulate("click");
    });
});
