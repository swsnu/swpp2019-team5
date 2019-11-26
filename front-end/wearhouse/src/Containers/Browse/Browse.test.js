import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import "../../setupTests";
import Browse from "./Browse";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";

const stubOutfit = {
    id: 0,
    imgaeUrl: "image.url",
    satisfactionValue: 4,
    date: "2019.10.28",
    user_id: 1,
    weather: {
        icon: "rain",
        tempAvg: 5,
    },
};

let stubOutfitState = {
    outfits: [stubOutfit],
    selected_Outfit: {
        id: "",
        user_id: 1,
        imageUrl: "",
        satisfactionValue: "",
        date: "",
    },
};

let stubWeatherState = {
    todayWeather: {
        summary: "clear",
        temperatureHigh: 10.01,
        temperatureLow: -0.01,
        icon: "clear",
    },
    selectedWeather: null,
};

var stubLoginState = { isLoggedIn: false, userID: null };

var mockStore = getMockStore(
    stubLoginState,
    {},
    stubOutfitState,
    {},
    stubWeatherState,
);

describe("<Browse />", () => {
    let outfitList, spyAxios_get, spyHistoryPush;

    beforeEach(() => {
        outfitList = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Browse history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));

        spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render Outfits, Header, AddOutfit", () => {
        const component = mount(outfitList);
        let wrapper = component.find("Outfit");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("AddOutfit");
        expect(wrapper.length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(3);
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        CreateInstance.setState({ mode: "?" });
        wrapper = component.find("Outfit");
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'onClickOutfit'`, () => {
        const component = mount(outfitList);
        let wrapper = component.find("Outfit .outfit-preview").at(0);
        wrapper.simulate("click");
        expect(spyAxios_get).toHaveBeenCalledTimes(4);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickCalendar'`, () => {
        const component = mount(outfitList);
        let wrapper = component.find("#calendar-button").at(0);
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it(`should click 'AddItemButton'`, () => {
        const component = mount(outfitList);
        let wrapper = component.find("#add-outfit-button").at(0);
        wrapper.simulate("click");

        // re-render component
        component.update();
        wrapper = component.find("#upload-image");
        expect(wrapper.length).toBe(1);
    });

    it(`should set state(search_query and mode) properly on search input when writing`, () => {
        const component = mount(outfitList);
        const wrapper = component.find("input");
        wrapper.simulate("change", { target: { value: "black shirt" } });
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();

        expect(CreateInstance.state.search_query).toEqual("black shirt");
        wrapper.simulate("keydown", {
            keyCode: 13,
        });
        expect(CreateInstance.state.mode).toEqual("search");

        wrapper.simulate("change", { target: { value: "" } });
        wrapper.simulate("keydown", {
            keyCode: 8,
        });
        expect(CreateInstance.state.search_query).toEqual("");
        expect(CreateInstance.state.mode).toEqual("browse");
    });

    it("should change searchOptionsVisible state", () => {
        const component = mount(outfitList);
        const wrapper = component.find("#selectButton");
        wrapper.simulate("click");
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        expect(CreateInstance.state.searchOptionsVisible).toEqual(true);

        wrapper.simulate("click");
        expect(CreateInstance.state.searchOptionsVisible).toEqual(false);
    });

    it("should change searchMode value when clicked", () => {
        const component = mount(outfitList);
        const wrapper = component.find("#selectButton");
        wrapper.simulate("click");

        var clicker = component.find(".option").at(0);
        clicker.simulate("click");
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        expect(CreateInstance.state.searchOptions.searchMode).toEqual("Outfit");
        clicker = component.find(".option").at(1);
        clicker.simulate("click");
        expect(CreateInstance.state.searchOptions.searchMode).toEqual("Item");
    });

    it("should add and delete tag to and from query", () => {
        const component = mount(outfitList);
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        const wrapper = component.find("input");
        wrapper.simulate("change", { target: { value: "black" } });
        wrapper.simulate("keydown", {
            keyCode: 8,
        });
        wrapper.simulate("keydown", {
            keyCode: 13,
        });

        wrapper.simulate("change", { target: { value: "black" } });
        wrapper.simulate("keydown", {
            keyCode: 13,
        });
        wrapper.simulate("keydown", {
            keyCode: 8,
        });

        expect(CreateInstance.state.searchOptions.searchArray.length).toBe(1);

        wrapper.simulate("keydown", {
            keyCode: 8,
        });
        expect(CreateInstance.state.searchOptions.searchArray.length).toBe(0);
        expect(CreateInstance.state.mode).toEqual("browse");
    });
});
