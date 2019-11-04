import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";

import App from "./App";
import { getMockStore } from "./mocks/mocks";
import { history } from "./store/store";

const stubOutfit = {
    id: 0,
    imgaeUrl: "image.url",
    satisfactionValue: 4,
    date: "2019.10.28",
    user_id: 1,
};

let outfitState = {
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
const stubNullState = {};
const mockStore = getMockStore(
    stubNullState,
    outfitState,
    stubNullState,
    stubNullState,
);

describe("App", () => {
    let app;
    beforeEach(() => {
        app = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <App history={history} />
                </ConnectedRouter>
            </Provider>
        );
    });
    it("should render", () => {
        const component = mount(app);
        expect(component.find("App").length).toBe(1);
    });
<<<<<<< HEAD

    it("should redirect to browse page", () => {
        history.push("/browse");
        const component = mount(app);
        console.log(component);
        expect(component.find("#browse").length).toBe(1);
    });
=======
>>>>>>> e67813dc30477de97fdd99ea396316d88366f1a5
});
