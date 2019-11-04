import * as actionTypes from "../actions/actionTypes";
export const initialState = {
    tags: [],
    selectedTag: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TAG: {
            const new_tag = {
                id: action.id,
                tag: action.tag,
            };
            const new_tags = state.tags.concat(new_tag);
            return { ...state, tag: new_tags };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
