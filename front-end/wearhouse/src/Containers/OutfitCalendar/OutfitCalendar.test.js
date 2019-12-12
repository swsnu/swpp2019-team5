import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
// import { getMockStore } from "../../test-utils/mocks";
import "../../setupTests";
import { history } from "../../store/store";
import OutfitCalendar from "./OutfitCalendar";
import { ConnectedRouter } from "connected-react-router";
import axios from "axios";

const stubInitialState = {
    outfits: [
        {
            date: "2019-12-05T03:00:00.000Z",
            id: 1,
            image: "https://test",
            items: [{ id: 1, category: "FullBody", tags: ["black", "stripe"] }],
            satisfactionValue: 5,
            weather: {
                tempAvg: -5,
                icon: "clear-day",
            },
        },
    ],
};

// const mockStore = getMockStore(stubInitialState);
const mockStore = getMockStore({}, {}, stubInitialState, {}, {}, {});

describe("<OutfitCalendar />", () => {
    let outfitCalendar;
    let spyAxios_get;
    beforeEach(() => {
        outfitCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <OutfitCalendar history={history} />
                </ConnectedRouter>
            </Provider>
        );
    });

    spyAxios_get = jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({}));

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render year, month, date, outfits properly initially", () => {
        const component = mount(outfitCalendar);
        let wrapper = component.find("#calendar-year-month");
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe("2019.12");
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });

    it("should render prev month on click prev month button", () => {
        const component = mount(outfitCalendar);
        let wrapper = component.find("#prev-month-button");

        wrapper.simulate("click");

        wrapper = component.find("#calendar-year-month");
        expect(wrapper.text()).toBe("2019.11");
    });

    it("should render next month on click next month button", () => {
        const component = mount(outfitCalendar);
        let wrapper = component.find("#next-month-button");

        wrapper.simulate("click");

        wrapper = component.find("#calendar-year-month");
        expect(wrapper.text()).toBe("2020.1");
    });
});
