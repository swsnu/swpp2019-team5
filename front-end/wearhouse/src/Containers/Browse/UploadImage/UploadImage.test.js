import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";
import UploadImage from "./UploadImage";
import { ConnectedRouter } from "connected-react-router";

let stubInitialState = {};

var mockStore = getMockStore(stubInitialState);

describe("<UploadImage/>", () => {
    let uploadImageContainer;

    beforeEach(() => {
        uploadImageContainer = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <UploadImage history={history} />
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render popup-header and upload file", () => {
        const component = mount(uploadImageContainer);
        let wrapper = component.find("#upload-image-header");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("#choose-file");
        expect(wrapper.length).toBe(1);
    });
});
