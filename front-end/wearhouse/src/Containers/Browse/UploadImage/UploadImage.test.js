import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";
import UploadImage from "./UploadImage";
import * as actionCreators from "../../../store/actions/index";
import { ConnectedRouter } from "connected-react-router";
import axios from "axios";

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render popup-header and upload file", () => {
        const component = mount(uploadImageContainer);
        let wrapper = component.find("#upload-image-header");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("#choose-file");
        expect(wrapper.length).toBe(1);
    });

    it("handle when valid image has been chosen", () => {
        const component = mount(uploadImageContainer);
        const CreateInstance = component
            .find(UploadImage.WrappedComponent)
            .instance();
        CreateInstance.setState({ isPreviewMode: true });
        setTimeout(function() {
            let wrapper = component.find("#selected-image-file");
            expect(wrapper.length).toBe(1);
            wrapper = component.find("#choose-other-image");
            expect(wrapper.length).toBe(1);
            wrapper = component.find("#confirm-image");
            expect(wrapper.length).toBe(1);
        }, 1000);
    });

    it("handle when chosen image is not valie", () => {
        const component = mount(uploadImageContainer);
        const CreateInstance = component
            .find(UploadImage.WrappedComponent)
            .instance();
        CreateInstance.setState({ showWarning: true });
        setTimeout(function() {
            let wrapper = component.find("#alert-message");
            expect(wrapper.length).toBe(1);
        }, 1000);
    });

    it("send POST request when clicking confirm image", () => {
        const component = mount(uploadImageContainer);
        const CreateInstance = component
            .find(UploadImage.WrappedComponent)
            .instance();
        const spyAxiosPost = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));

        CreateInstance.setState({ isPreviewMode: true });
        setTimeout(function() {
            let wrapper = component.find("#confirm-image");
            expect(wrapper.length).toBe(0);
            wrapper.simulate("click");
            expect(spyAxiosPost).toBeCalledTimes(3);
        }, 1000);
    });
});
