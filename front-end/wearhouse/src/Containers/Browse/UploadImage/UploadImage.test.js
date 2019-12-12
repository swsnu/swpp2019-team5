import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks_specific";
import { history } from "../../../store/store";
import UploadImage from "./UploadImage";
import { ConnectedRouter } from "connected-react-router";
import axios from "axios";

let stubInitialState_image = {
    outfitData: {
        id: "",
        image: "",
        satisfactionValue: null,
        date: "2019-11-07T04",
        items: [{ category: "Outer", tags: [] }],
        weather: { tempAvg: "", icon: "" },
    },
};

var mockStore = getMockStore({}, {}, {}, {}, {}, stubInitialState_image);
var mockOnClosePopup = jest.fn();

describe("<UploadImage/>", () => {
    let uploadImageContainer;

    beforeEach(() => {
        uploadImageContainer = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <UploadImage
                        history={history}
                        onClosePopUp={mockOnClosePopup}
                    />
                </ConnectedRouter>
            </Provider>
        );

        global.URL.createObjectURL = jest.fn();
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

    it("handle when valid image has been chosen", async () => {
        let component = mount(uploadImageContainer);
        let wrapper = component.find("#choose-file");

        // input valid file
        wrapper.simulate("change", {
            target: {
                files: [{ name: "test_image.jpg", type: "image/jpeg" }],
            },
        });

        // re-render component
        component.update();

        wrapper = component.find("#selected-image-file");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("#choose-other-image");
        expect(wrapper.length).toBe(1);
        wrapper = component.find("#confirm-image");
        expect(wrapper.length).toBe(1);
    });

    it("handle when the file does not exist at all", () => {
        const component = mount(uploadImageContainer);
        let wrapper = component.find("#choose-file");

        // file does not exist
        wrapper.simulate("change", {
            target: {},
        });
        // re-render component
        component.update();

        wrapper = component.find("#alert-message");
        expect(wrapper.length).toBe(0);
        wrapper = component.find("#selected-image-file");
        expect(wrapper.length).toBe(0);
    });

    it("handle when chosen image is not valid", () => {
        const component = mount(uploadImageContainer);
        let wrapper = component.find("#choose-file");

        // input invalid file
        wrapper.simulate("change", {
            target: {
                files: [{ name: "test_image.jpg", type: "invalid-type" }],
            },
        });
        // re-render component
        component.update();

        wrapper = component.find("#alert-message");
        expect(wrapper.length).toBe(1);
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
        // re-render component
        let wrapper = component.find("#choose-file");

        // input valid file
        wrapper.simulate("change", {
            target: {
                files: [{ name: "test_image.jpg", type: "image/jpeg" }],
            },
        });
        component.update();

        wrapper = component.find("#confirm-image");
        expect(wrapper.length).toBe(1);
        wrapper.simulate("click");
        expect(spyAxiosPost).toBeCalledTimes(1);
    });

    it("handle choose-other-image button", () => {
        const component = mount(uploadImageContainer);
        const CreateInstance = component
            .find(UploadImage.WrappedComponent)
            .instance();
        CreateInstance.setState({ isPreviewMode: true });
        // re-render component
        component.update();

        let wrapper = component.find("#choose-other-image");
        expect(wrapper.length).toBe(1);
        wrapper.simulate("click");
        wrapper = component.find("#selected-image-file");
        expect(wrapper.length).toBe(0);
    });

    it("handle close upload-image popup", () => {
        const component = mount(uploadImageContainer);

        let wrapper = component.find("#cancel-upload-image");
        wrapper.simulate("click");
        expect(mockOnClosePopup).toBeCalledTimes(1);
    });
});
