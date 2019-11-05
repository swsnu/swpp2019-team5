/*import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import "../../setupTests";
import axios from "axios";
import CreateOutfit from "./CreateOutfit";

let stubInitialState = {
    id: 1,
    image: null,
    satisfactionValue: null,
    date: null,
    items: [
        { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
        { category: "Shoes", tags: ["black", "opentoe"] },
        { category: "LowerBody", tags: ["jeans"] },
        { category: "Accessories", tags: ["black", "golden-buckle"] },
    ],
};

let mockStore = getMockStore(stubInitialState);
/*
describe("<CreateOutfit />", () => {
    let createOutfit, spyHistoryPush, spyAxios_post, spyAxios_put;

    beforeEach(() => {
        createOutfit = (
            <Provider store={mockStore}>
                <CreateOutfit history={history} />
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));

        spyAxios_put = jest
            .spyOn(axios, "put")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#create-outfit");
        expect(wrapper.length).toBe(1);
    });

    it("should put newly created outfit", () => {
        const component = mount(createOutfit);
        let wrapper = component.find("#confirm-create-item");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(12);
        //4 itmes and 8 tags are newly posted
        expect(spyAxios_put).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});*/
