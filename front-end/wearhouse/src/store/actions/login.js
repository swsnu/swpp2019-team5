import * as actionTypes from "./actionTypes";
import axios from "axios";

import { push } from "connected-react-router";

export const logIn_ = user => {
    //temporary return value
    return { type: actionTypes.LOGIN, isLoggedIn: true, userID: user };
};

export const logIn = userCredentials => {
    //userCredentials must be loaded in a {email: ~~, password: ~~} format
    return dispatch => {
        return axios.post("api/user/login/", { userCredentials }).then(res => {
            //TODO: divide cases according to login status code
            dispatch(logIn_(res.data));
            dispatch(push("/browse"));
        });
    };
};

export const logOut_ = user => {
    return { type: actionTypes.LOGOUT, user: user };
};

export const logOut = () => {
    return dispatch => {
        return axios.get("/api/user/logout/").then(res => {
            //TODO: divide cases according to login status code
            dispatch(logOut_(res.data));
            dispatch(push("/login"));
        });
    };
};

export const signUp_ = user => {
    return { type: actionTypes.SIGN_UP, user: user };
};

export const signUp = () => {
    return dispatch => {
        return axios.post("/api/user/signup").then(res => {
            dispatch(signUp_(res.data));
            dispatch(push("/login"));
        });
    };
};
