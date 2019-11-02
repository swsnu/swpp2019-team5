import React from "react";
import { shallow } from "enzyme";

import EditSatisfaction from "./EditSatisfaction";

describe("<EditSatisfaction/ >", () => {
    it("should render", () => {
        const component = shallow(<EditSatisfaction />);
        expect(component.find("#edit-satisfaction").length).toBe(1);
    });

    it("should have null icon as default", () => {
        const component = shallow(<EditSatisfaction />);
        expect(component.find(".null-icon").length).toBe(1);
    });

    it("should update selectedIcon", () => {
        const component = shallow(<EditSatisfaction />);

        const button = component.find(".satisfaction-functions");
        button.simulate("click");

        const wrapper = component.find(".satisfaction-option");
        wrapper.at(0).simulate("click");
        expect(component.find(".selected").length).toBe(1);
    });

    it("should update state", () => {
        const component = shallow(<EditSatisfaction />);

        const button1 = component.find(".satisfaction-functions");
        button1.simulate("click");

        const button2 = component.find(".satisfaction-functions");
        button2.simulate("click");

        expect(component.state().editMode).toBe("");
    });
});
