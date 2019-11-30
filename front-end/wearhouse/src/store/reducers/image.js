import * as actionTypes from "../actions/actionTypes";

const initialState = {
    outfitData: {
        id: "",
        image: "",
        satisfactionValue: null,
        date: null,
        items: null,
        weather: { tempAvg: "", icon: "" },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_IMAGE: {
            const outfitData = {
                image: action.image,
                items: action.items,
            };
            console.log(outfitData);
            return { ...state, outfitData: outfitData };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
