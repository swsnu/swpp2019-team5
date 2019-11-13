import * as actionTypes from "../actions/actionTypes";
const initialState = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ITEM: {
            const new_item = {
                id: action.id,
                tags: action.tag,
                category: action.category,
            };
            const new_items = state.items.concat(new_item);
            return { ...state, items: new_items };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
