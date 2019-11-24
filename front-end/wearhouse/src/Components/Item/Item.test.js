import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import Item from "./Item";

let stubInitialState = {};
let mockStore = getMockStore(stubInitialState);

describe("<Item/>", () => {
    let item, deleteHandler, editHandler;
    beforeEach(() => {
        item = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Item
                        editMode={true}
                        item={{ tags: ["black", "T-shirt"] }}
                        applyEdit={jest.fn()}
                        delete={editHandler}
                    />
                </ConnectedRouter>
            </Provider>
        );

        deleteHandler = jest.fn();
        editHandler = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly", () => {
        const component = mount(item);

        expect(component.find(".Item").length).toBe(1);
    });

    it("should edit item values", () => {
        const component = mount(item);

        let wrapper = component.find(".tag-input");
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keydown", {
            keyCode: 13,
        });
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(2);
        expect(wrapper.value).toBe(undefined);
    });

    it("should add tag", () => {
        const component = mount(item);
        let wrapper = component.find(".tag-input");
        wrapper.instance().value = "new_tag";
        wrapper.simulate("keydown", {
            keyCode: 13,
        });
        expect(component.find(".tag-in-outfit").length).toBe(3);
    });

    it("should delete tags", () => {
        const component = mount(item);

        let wrapper = component.find(".delete-tag").at(0);
        wrapper.simulate("click");
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(1);

        wrapper = component.find(".tag-input");
        wrapper.simulate("click");
        wrapper.simulate("keydown", {
            keyCode: 8,
        });
        count = component.find(".tag-in-outfit");
        expect(count.length).toBe(0);
    });

    it("should delete item", () => {
        const component = mount(item);

        let wrapper = component.find(".item-deleter");
        wrapper.simulate("click");
    });
});
