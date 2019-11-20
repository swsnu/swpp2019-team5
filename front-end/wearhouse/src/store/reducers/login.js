import * as actionTypes from "../actions/actionTypes";
const initialState = {
    isLoggedIn: true,
    userID: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { ...state, isLoggedIn: true };
        case actionTypes.GET_LOGIN:
            return { ...state, isLoggedIn: action.login };
        case actionTypes.LOGOUT:
            return { ...state, isLoggedIn: false };
        case actionTypes.SIGN_UP:
            return { ...state };
        default:
            break;
    }
    return state;
};
export default reducer;
