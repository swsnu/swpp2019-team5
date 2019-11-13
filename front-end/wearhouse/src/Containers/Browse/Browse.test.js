import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../mocks/mocks";
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
    todayWeather: "clear",
    selectedWeather: null,
};

var mockStore = getMockStore({}, {}, stubOutfitState, {}, stubWeatherState);

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
        wrapper = component.find("Header");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("AddOutfit");
        expect(wrapper.length).toBe(1);
        expect(spyAxios_get).toBeCalledTimes(2);
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        CreateInstance.setState({ mode: "?" });
        wrapper = component.find("Outfit");
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'onClickOutfit'`, () => {
        const spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
        const component = mount(outfitList);
        let wrapper = component.find("Outfit .outfit-preview").at(0);
        wrapper.simulate("click");
        expect(spyAxios_get).toHaveBeenCalledTimes(3);
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
        const wrapper = component.find("#add-outfit-button").at(0);
        wrapper.simulate("click");
        //fill expect~~ after implementing AddOutfit onclick function
    });

    it(`should set state(search_query and mode) properly on search input when writing`, () => {
        const component = mount(outfitList);
        const wrapper = component.find("input");
        wrapper.simulate("change", { target: { value: "black shirt" } });
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        expect(CreateInstance.state.search_query).toEqual("black shirt");
        expect(CreateInstance.state.mode).toEqual("search");

        wrapper.simulate("change", { target: { value: "" } });
        expect(CreateInstance.state.search_query).toEqual("");
        expect(CreateInstance.state.mode).toEqual("browse");
    });
});
