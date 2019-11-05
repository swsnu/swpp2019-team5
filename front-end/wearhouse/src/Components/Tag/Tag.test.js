import React from "react";
import { shallow } from "enzyme";

import Tag from "./Tag";

describe("<Tag />", () => {
    it("should render", () => {
        const component = shallow(<Tag />);
        expect(component.find(".Tag").length).toBe(1);
    });

    it("should call onEditTag", () => {
        const component = shallow(<Tag edit={jest.fn()} />);
        component.setState({ editMode: true });
        component.find(".edit-tag").simulate("click");

        let inputWrapper = component.find("input");
        inputWrapper.simulate("change", { target: { value: "newcontent" } });
        let buttonwrapper = component.find(".edit-tag");
        buttonwrapper.simulate("click");

        expect(component.find(".Tag").length).toBe(1);
    });
});
