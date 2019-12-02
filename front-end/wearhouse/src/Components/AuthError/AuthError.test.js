import React from "react";
import { shallow } from "enzyme";

import AuthError from "./AuthError";

describe("<AuthError />", () => {
    it("should render", () => {
        const component = shallow(<AuthError />);
        expect(component.find("#auth-error").length).toBe(1);
    });
});
