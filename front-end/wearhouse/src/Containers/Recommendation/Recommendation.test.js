import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../mocks/mocks";
import { history } from "../../store/store";
import Recommendation from "./Recommendation";

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

describe("<Recommendation />", () => {
    let recommendation;
    let spyAxios_get;
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
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render", () => {
        const component = mount(recommendation);
        expect(component.find("#recommendation").length).toBe(1);
    });
});
