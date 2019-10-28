import React from "react";
import { shallow } from "enzyme";

import Satisfaction from "./Satisfaction";

describe("Satisfaction", () => {
    it("should render", () => {
        const component = shallow(<Satisfaction />);
        expect(component.find(".satisfaction-icon").length).toBe(1);
    });
});
