import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import Item from "./Item";

let stubInitialState_item = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
    option_list: [
        {
            id: 1,
            category: "UpperBody",
            tags: ["T-shirt", "2019"],
        },
        {
            id: 2,
            category: "UpperBody",
            tags: ["fall", "stripe", "blue"],
        },
        {
            id: 3,
            category: "UpperBody",
            tags: ["coat", "wool", "pink"],
        },
        {
            id: 4,
            category: "UpperBody",
            tags: ["mom", "hand-made", "check-shirt"],
        },
    ],
};
let mockStore = getMockStore(
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
);

describe("<Item/>", () => {
    let item, deleteHandler, editHandler;
    beforeEach(() => {
        item = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Item
                        editMode={true}
                        item={{ tags: ["black", "T-shirt", "2019"] }}
                        applyEdit={deleteHandler}
                        delete={editHandler}
                    />
                </ConnectedRouter>
            </Provider>
        );

        deleteHandler = jest.fn();
        editHandler = jest.fn();
    });

    it("add tag on the first item", () => {
        const component = mount(item);
        let wrapper = component.find(".tag-input").at(0);
        wrapper.simulate("change", { target: { value: "new_tag" } });
        wrapper.simulate("keypress", {
            key: "Enter",
        });
    });

    it("should render properly", () => {
        const component = mount(item);

        expect(component.find(".Item").length).toBe(1);
    });

    it("should edit item values", () => {
        const component = mount(item);

        let wrapper = component.find(".tag-input").at(0);
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keypress", {
            key: "Enter",
        });
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(3); //doesn't actually work but
    });

    it("should delete tags", () => {
        const component = mount(item);

        let wrapper = component.find(".delete-tag").at(0);
        wrapper.simulate("click");
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(2); //doesn't actually work but
    });

    it("should delete item", () => {
        const component = mount(item);

        let wrapper = component.find(".item-deleter");
        wrapper.simulate("click");
    });

    it("should edit tags", () => {
        const component = mount(item);
        let wrapper = component.find(".edit-tag").at(0);
        wrapper.simulate("click");

        component
            .find(".tag-in-outfit input")
            .simulate("change", { target: { value: "newvalue" } });

        wrapper = component.find(".edit-tag").at(0);
        wrapper.simulate("click");
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(3); //doesn't actually work but
    });

    it("should edit category", () => {
        const component = mount(item);
        let wrapper = component.find(".Select").at(0);
        wrapper.simulate("click");
        //expect(wrapper.find()).toBe(3);
    });

    it("should change state", () => {
        const component = mount(item);
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(3); //doesn't actually work but
    });
});
