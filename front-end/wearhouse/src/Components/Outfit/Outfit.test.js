import React from "react";
import { shallow } from "enzyme";

import Outfit from "./Outfit";

describe("Outfit", () => {
    it("should render", () => {
        const component = shallow(<Outfit />);
        expect(component.find(".outfit-preview").length).toBe(1);
    });
});
