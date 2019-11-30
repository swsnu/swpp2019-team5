import reducer from "./login";
import * as actionTypes from "../actions/actionTypes";

describe("Login Reducer", () => {
    it("should return default state", () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
    });

    it("should login", () => {
        const newState = reducer(undefined, {
            type: actionTypes.LOGIN,
            isLoggedIn: true,
            loginErr: "",
        });
        expect(newState).toEqual({
            isLoggedIn: true,
            loginErr: "",
            signupErr: "",
        });
    });

    it("should logout", () => {
        const newState = reducer(undefined, {
            type: actionTypes.LOGOUT,
        });
        expect(newState).toEqual({
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
    });

    it("should get login state", () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_LOGIN,
            login: true,
        });
        expect(newState).toEqual({
            isLoggedIn: true,
            loginErr: "",
            signupErr: "",
        });
    });

    it("should reset error state", () => {
        const newState = reducer(undefined, {
            type: actionTypes.RESET_ERR,
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
        expect(newState).toEqual({
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
    });

    it("should sign up", () => {
        const newState = reducer(undefined, {
            type: actionTypes.SIGN_UP,
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
        expect(newState).toEqual({
            isLoggedIn: false,
            loginErr: "",
            signupErr: "",
        });
    });
});
