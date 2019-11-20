import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";

import App from "./App";
import { getMockStore } from "./test-utils/mocks_specific";
import { history } from "./store/store";

const outfitState = {
    outfits: [
        {
            id: 1,
            items: [
                { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
                { category: "Shoes", tags: ["black", "opentoe"] },
                { category: "LowerBody", tags: ["jeans"] },
                { category: "Accessories", tags: ["black", "golden-buckle"] },
            ],
        },
    ],
    selectedOutfit: {
        id: 1,
        items: [
            { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
            { category: "Shoes", tags: ["black", "opentoe"] },
            { category: "LowerBody", tags: ["jeans"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
        ],
        satisfactionValue: 3,
        date: "2019.11.7",
    },
};
const itemState = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
};

const stubNullState = {};
const mockStore = getMockStore(
    stubNullState,
    outfitState,
    itemState,
    stubNullState,
    stubNullState,
);

describe("App", () => {
    let app;
    let spyAxios_get;
    beforeEach(() => {
        app = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <App history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() =>
                Promise.resolve({ data: { isLoggedIn: true } }),
            );
    });

    it("should render", () => {
        const component = mount(app);
        expect(component.find("App").length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(2);
    });
});
