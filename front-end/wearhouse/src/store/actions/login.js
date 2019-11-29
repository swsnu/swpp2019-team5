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
    return { type: actionTypes.LOGIN, isLoggedIn: true, loginErr: "" };
};

export const loginFail = err => {
    return { type: actionTypes.LOGIN, isLoggedIn: false, loginErr: err };
};

export const logIn = userCredentials => {
    return dispatch => {
        return axios
            .post("/api/user/login/", userCredentials)
            .then(() => {
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
            });
    };
};

export const logOut_ = () => {
    return { type: actionTypes.LOGOUT };
};

export const logOut = () => {
    return dispatch => {
        return axios.get("/api/user/logout/").then(() => {
            dispatch(logOut_());
            dispatch(push("/main"));
        });
    };
};

export const signUp_ = () => {
    return { type: actionTypes.SIGN_UP, signupErr: "" };
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
            });
    };
};

export const resetErr = () => {
    return { type: actionTypes.RESET_ERR, signupErr: "", loginErr: "" };
};
