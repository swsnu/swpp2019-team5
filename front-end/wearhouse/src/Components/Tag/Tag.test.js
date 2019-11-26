import React from "react";
import { shallow } from "enzyme";

import Tag from "./Tag";

describe("<Tag />", () => {
    it("should render", () => {
        const component = shallow(<Tag />);
        expect(component.find(".Tag").length).toBe(1);
    });
});
