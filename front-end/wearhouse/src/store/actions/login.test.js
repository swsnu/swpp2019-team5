import * as actionCreators from "./login";
import axios from "axios";

import store from "../store";

describe("Login Actioncreators", () => {
    afterEach(() => jest.clearAllMocks());

    it("should fail to sign up", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 400,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.signUp()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it("should fail to sign up with random error", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 405,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.signUp()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it("should fail to sign in at 400 error", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 400,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.logIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it("should fail to sign in at 401 error", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 401,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.logIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it("should fail to sign in at 404 error", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 404,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.logIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it("should fail to sign in with random error", done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {
                        status: 405,
                    },
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.logIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
