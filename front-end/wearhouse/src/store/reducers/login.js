import * as actionTypes from "../actions/actionTypes";
const initialState = {
    isLoggedIn: false,
    userID: null,
};

const reducer = (state = initialState, action) => {
    switch (action) {
        case actionTypes.LOGIN:
            return { ...state };
        // hard-code the user id since that's all we're going to needs
        default:
            break;
    }
    return state;
};
export default reducer;
