import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";
import EditOutfit from "./EditOutfit";

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
    outfits: [],

    selectedOutfit: {
        id: 1,
        image: null,
        satisfactionValue: 3,
        date: "2019-11-07T04",
        items: [
            {
                id: 1,
                category: "UpperBody",
                tags: ["red", "sheep-fur"],
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
    stubInitialState_login,
    stubInitialState_item,
    stubInitialState_outfit,
    stubInitialState_outfit,
    stubInitialState_weather,
    stubInitialState_image,
);

describe("<EditOutfit />", () => {
    let editOutfit, spyHistoryPush, spyAxios_put, spyAxios_get;
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
        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(editOutfit);
        let wrapper = component.find(".EditOutfit");
        expect(wrapper.length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });

    it("edit satisfaction valaue", () => {
        const component = mount(editOutfit);
        const button = component.find(".satisfaction-functions").at(1);
        button.simulate("click");

        const wrapper = component.find(".satisfaction-option");
        wrapper.at(0).simulate("click");
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

        wrapper = component.find(".Item .tag-input").at(4);
        wrapper = component.find(".Item .tag-input").at(0);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keyDown", {
            keyCode: 13,
        });
        confirm.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(0);
    });

    it("should set null date", () => {
        let component = mount(editOutfit);
        component
            .find(".react-datepicker__close-icon")
            .at(0)
            .simulate("click");
        let instance = component.find(EditOutfit.WrappedComponent).instance();
        expect(instance.state.date).toBe(undefined);
    });

    it("should call onDeleteItem", () => {
        const component = mount(editOutfit);
        let wrapper = component.find(".Item .item-deleter").at(0);
        wrapper.simulate("click");

        let count = component.find(".Item");
        expect(count.length).toBe(3);
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
