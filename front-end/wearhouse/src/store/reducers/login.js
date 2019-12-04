import * as actionTypes from "../actions/actionTypes";
const initialState = {
    isLoggedIn: true,
    loginErr: "",
    signupErr: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                loginErr: action.loginErr,
            };
        case actionTypes.GET_LOGIN:
            return { ...state, isLoggedIn: action.login };
        case actionTypes.LOGOUT:
            return { ...state, isLoggedIn: false };
        case actionTypes.SIGN_UP:
            return { ...state, signupErr: action.signupErr };
        case actionTypes.RESET_ERR:
            return {
                ...state,
                signupErr: action.signupErr,
                loginErr: action.loginErr,
            };
        default:
            break;
    }
    return state;
};
export default reducer;
