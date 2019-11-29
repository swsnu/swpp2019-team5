import * as actionTypes from "./actionTypes";
import axios from "axios";

import { push } from "connected-react-router";

export const getLogIn_ = data => {
    return { type: actionTypes.GET_LOGIN, login: data.isLoggedIn };
};

export const getLogin = () => {
    return dispatch => {
        return axios.get("/api/user").then(res => {
            dispatch(getLogIn_(res.data));
        });
    };
};

export const logIn_ = () => {
    return { type: actionTypes.LOGIN, isLoggedIn: true, loginErr: null };
};

export const loginFail = err => {
    return { type: actionTypes.LOGIN, isLoggedIn: false, loginErr: err };
};

export const logIn = userCredentials => {
    return dispatch => {
        return axios
            .post("/api/user/login/", userCredentials)
            .then(() => {
                //TODO: divide cases according to login status code
                dispatch(logIn_());
                dispatch(push("/browse"));
            })
            .catch(err => {
                let errMessage = "";
                switch (err.response.status) {
                    case 401:
                        errMessage = "Email or Password incorrect";
                        break;
                    case 400:
                        errMessage =
                            "Something went wrong with the request. Try again.";
                        break;
                    case 404:
                        errMessage = "Email or Password incorrect";
                        break;
                    default:
                        break;
                }
                dispatch(loginFail(errMessage));
                dispatch(push("/login"));
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

export const signUp_ = () => {
    return { type: actionTypes.SIGN_UP, signupErr: null };
};

export const signupFail = err => {
    return { type: actionTypes.SIGN_UP, signupErr: err };
};

export const signUp = userCredentials => {
    return dispatch => {
        return axios
            .post("/api/user/", userCredentials)
            .then(() => {
                dispatch(signUp_());
                dispatch(push("/browse"));
            })
            .catch(err => {
                let errMessage = "";
                console.log(err.response);
                if (err.response.status === 400) {
                    errMessage = "Email is already registered";
                }
                dispatch(signupFail(errMessage));
                dispatch(push("/signup"));
            });
    };
};
