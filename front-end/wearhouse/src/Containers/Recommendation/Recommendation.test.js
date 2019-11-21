import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import Recommendation from "./Recommendation";

import axios from "axios";
import { ConnectedRouter } from "connected-react-router";

let stubOutfitState = {
    outfits: [
        {
            id: 0,
            imgaeUrl: "image.url",
            satisfactionValue: 4,
            date: "2019.10.28",
            user_id: 1,
            weather: {
                icon: "clear",
                tempAvg: 5,
            },
        },
        {
            id: 0,
            imgaeUrl: "image.url",
            satisfactionValue: 4,
            date: "2019.10.28",
            user_id: 1,
            weather: {
                icon: "rain",
                tempAvg: 5,
            },
        },
        {
            id: 0,
            imgaeUrl: "image.url",
            satisfactionValue: 4,
            date: "2019.10.28",
            user_id: 1,
            weather: {
                icon: "clear",
                tempAvg: 10,
            },
        },
    ],
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

var mockStore = getMockStore({}, {}, stubOutfitState, {}, stubWeatherState);

describe("<Recommendation />", () => {
    let recommendation;
    let spyAxios_get, spyHistoryPush;
    beforeEach(() => {
        recommendation = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Recommendation history={history} />
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

    it("should render", () => {
        const component = mount(recommendation);
        expect(component.find("#recommendation").length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(2);
    });

    it("should filter Only the items for recommendation", () => {
        const component = mount(recommendation);
        expect(component.find(".outfit-preview").length).toBe(1); //Wait for props loading time
    });

    it("should call onClickOutfit", () => {
        const component = mount(recommendation);
        let wrapper = component.find("#recommendation .outfit-preview"); //Wait for props loading time
        wrapper.simulate("click");
        expect(spyAxios_get).toHaveBeenCalledTimes(3);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should ", () => {
        let mockStore_temp = getMockStore({}, {}, stubOutfitState, {}, {});

        const component = mount(
            <Provider store={mockStore_temp}>
                <ConnectedRouter history={history}>
                    <Recommendation history={history} />
                </ConnectedRouter>
            </Provider>,
        );

        expect(component.find(".outfit-preview").length).toBe(0);
    });
});
