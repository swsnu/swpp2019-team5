import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/article";
import Article from "./Article";
import "../../setupTests";
import axios from "axios";

const stubArticle = {
    id: 0,
    title: "title1",
    content: "content1",
    author_id: 1,
};

const stubComment = {
    id: 0,
    author_id: "author1",
    content: "content1",
};

let stubInitialState = {
    articles: [stubArticle],
    comments: [stubComment],
    author_id: 1,
    selected_Article: { id: "", author_id: 1, content: "", title: "" },
    users: [
        {
            id: 1,
            email: "swpp@snu.ac.kr",
            password: "iluvswpp",
            name: "Software Lover",
            logged_in: false,
        },
        {
            id: 2,
            email: "alan@turing.com",
            password: "iluvswpp",
            name: "Alan Turing",
            logged_in: false,
        },
        {
            id: 3,
            email: "edsger@dijkstra.com",
            password: "iluvswpp",
            name: "Edsger Dijkstra",
            logged_in: false,
        },
    ],
    logged_in: false,
    user1: {
        id: 1,
        email: "swpp@snu.ac.kr",
        password: "iluvswpp",
        name: "Software Lover",
        logged_in: false,
    },
};

var mockStore = getMockStore(stubInitialState);

describe("<Article />", () => {
    let articleList,
        spyGetArticles,
        spyHistoryPush,
        spyAxios_put,
        spyAxios_delete,
        spyAxios_post,
        spyAxios_get;

    beforeEach(() => {
        articleList = (
            <Provider store={mockStore}>
                <Article history={history} />
            </Provider>
        );

        spyGetArticles = jest
            .spyOn(actionCreators, "getArticles")
            .mockImplementation(() => {
                return dispatch => {};
            });

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(td => {
            return dispatch => {};
        });
        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
        spyAxios_post = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
        spyAxios_put = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
        spyAxios_delete = jest
            .spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
    });

    it("should render Articles", () => {
        const component = mount(articleList);
        const wrapper = component.find("Artcl");
        expect(wrapper.length).toBe(1);
        expect(wrapper.at(0).text()).toBe("0. title1 Author: Software Lover");
        expect(spyGetArticles).toBeCalledTimes(1);
    });

    it(`should call 'clickTodoHandler'`, () => {
        const spyGetComments = jest
            .spyOn(actionCreators, "getComments")
            .mockImplementation(() => {
                return dispatch => {};
            });
        const spyGetArticle = jest
            .spyOn(actionCreators, "getArticle")
            .mockImplementation(artcl => {
                return dispatch => {};
            });
        const component = mount(articleList);
        let wrapper = component.find("Artcl #title").at(0);
        wrapper.simulate("click");
        expect(spyGetComments).toHaveBeenCalledTimes(1);
        expect(spyGetArticle).toHaveBeenCalledTimes(1);
        wrapper = component.find(Article.WrappedComponent).instance();
        wrapper.setState({ fortest: true });
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it("should render redirect to detail page", () => {
        stubInitialState = {
            articles: [stubArticle],
            comments: [stubComment],
            author_id: 1,
            selected_Article: stubArticle,
            users: [
                {
                    id: 1,
                    email: "swpp@snu.ac.kr",
                    password: "iluvswpp",
                    name: "Software Lover",
                    logged_in: false,
                },
            ],
            logged_in: false,
            user1: {
                id: 1,
                email: "swpp@snu.ac.kr",
                password: "iluvswpp",
                name: "Software Lover",
                logged_in: false,
            },
        };
        mockStore = getMockStore(stubInitialState);
        articleList = (
            <Provider store={mockStore}>
                <Article history={history} />
            </Provider>
        );
        const component = mount(articleList);
    });
    it(`should move to 'create page'`, () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(articleList);
        const wrapper = component.find("#create-article-button").at(0);
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledWith("/articles/create");
    });
});
