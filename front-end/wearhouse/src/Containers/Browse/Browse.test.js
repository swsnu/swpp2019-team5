import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/outfit";
import "../../setupTests";
import axios from "axios";
import Browse from "./Browse";
import Outfit from "../../Components/Outfit/Outfit";

const stubOutfit = {
    id: 0,
    imgaeUrl: "image.url",
    satisfactionValue: 4,
    date: "2019.10.28",
    user_id: 1,
};

let stubInitialState = {
    outfits: [stubOutfit],
    user_id: 1,
    selected_Outfit: {
        id: "",
        user_id: 1,
        imageUrl: "",
        satisfactionValue: "",
        date: "",
    },
    users: [
        {
            id: 1,
            email: "swpp@snu.ac.kr",
            password: "iluvswpp",
            logged_in: false,
        },
        {
            id: 2,
            email: "alan@turing.com",
            password: "iluvswpp",
            logged_in: false,
        },
        {
            id: 3,
            email: "edsger@dijkstra.com",
            password: "iluvswpp",
            logged_in: false,
        },
    ],
    logged_in: false,
    user1: {
        id: 1,
        email: "swpp@snu.ac.kr",
        password: "iluvswpp",
        logged_in: false,
    },
};

var mockStore = getMockStore(stubInitialState);

describe("<Browse />", () => {
    let outfitList, spyGetOutfits, spyHistoryPush, spyAxios_get;

    beforeEach(() => {
        outfitList = (
            <Provider store={mockStore}>
                <Browse history={history} />
            </Provider>
        );

        spyGetOutfits = jest
            .spyOn(actionCreators, "getOutfits")
            .mockImplementation(() => {
                return dispatch => {};
            });

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(td => {
            return dispatch => {};
        });
        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
    });

    it("should render Outfits, Logout, AddOutfit", () => {
        const component = mount(outfitList);
        let wrapper = component.find("Outfit");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("Logout");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("AddOutfit");
        expect(wrapper.length).toBe(1);
        expect(spyGetOutfits).toBeCalledTimes(1);
        const CreateInstance = component
            .find(Browse.WrappedComponent)
            .instance();
        CreateInstance.setState({ mode: "?" });
        wrapper = component.find("Outfit");
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'onClickOutfit'`, () => {
        const spyGetSpecificOutfit = jest
            .spyOn(actionCreators, "getSpecificOutfit")
            .mockImplementation(outfit_id => {
                return dispatch => {};
            });
        const component = mount(outfitList);
        let wrapper = component.find("Outfit .outfit-preview").at(0);
        wrapper.simulate("click");
        expect(spyGetSpecificOutfit).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickCalendar'`, () => {
        const component = mount(outfitList);
        let wrapper = component.find("#calendar-button").at(0);
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
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
