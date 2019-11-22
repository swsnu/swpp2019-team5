import * as actionTypes from "./actionTypes";
import axios from "axios";

import { push } from "connected-react-router";

export const getLogIn_ = data => {
    return { type: actionTypes.GET_LOGIN, login: data.isLoggedIn };
};

export const getLogin = () => {
    return dispatch => {
        return axios.get("api/user").then(res => {
            dispatch(getLogIn_(res.data));
        });
    };
};

export const logIn_ = user => {
    return { type: actionTypes.LOGIN, isLoggedIn: true, userID: user };
};

export const logIn = userCredentials => {
    return dispatch => {
        return axios.post("api/user/login/", userCredentials).then(res => {
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
            dispatch(push("/main"));
        });
    };
};

export const signUp_ = user => {
    return { type: actionTypes.SIGN_UP, user: user };
};

export const signUp = userCredentials => {
    return dispatch => {
        return axios.post("/api/user/", userCredentials).then(res => {
            dispatch(signUp_(res.data));
            dispatch(push("/login"));
        });
    };
};
