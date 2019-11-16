import * as actionTypes from "../actions/actionTypes";
const initialState = {
    isLoggedIn: false,
    userID: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { ...state, isLoggedIn: true };
        case actionTypes.GET_LOGIN:
            return { ...state, isLoggedIn: action.login };
        default:
            break;
    }
    return state;
};
export default reducer;
