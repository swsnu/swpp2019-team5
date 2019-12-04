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

var mockStore = getMockStore(
    {},
    {},
    stubOutfitState,
    {},
    stubWeatherState,
    {},
    {},
);

describe("<Recommendation />", () => {
    let recommendation;
    let spyHistoryPush;
    beforeEach(() => {
        recommendation = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Recommendation history={history} />
                </ConnectedRouter>
            </Provider>
        );

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
    });

    it("should filter Only the items for recommendation", () => {
        const component = mount(recommendation);
        expect(component.find(".outfit-preview").length).toBe(1);
    });

    it("should call onClickOutfit", () => {
        const component = mount(recommendation);
        let wrapper = component.find("#recommendation .outfit-preview");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should toggle on click", () => {
        const component = mount(recommendation);
        let wrapper = component.find("#open-button");
        wrapper.simulate("click");
        expect(component.find("#folded").length).toBe(1);

        wrapper.simulate("click");
        expect(component.find("#recommendation-wrapper").length).toBe(1);
    });
});
