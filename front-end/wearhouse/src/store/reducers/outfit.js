import * as actionTypes from "../actions/actionTypes";

const initialState = {
    outfits: [],
    selectedOutfit: {
        image: null,
        satisfactionValue: 3,
        date: new Date(),
        items: [
            { category: "UpperBody", tags: ["red", "sheep-fur", "long"] },
            { category: "UpperBody", tags: ["red", "sheep-fur", "long"] },
            { category: "UpperBody", tags: ["red", "sheep-fur", "long"] },
            { category: "UpperBody", tags: ["red", "sheep-fur", "long"] },
        ],
        weather: {
            tempAvg: 10,
            icon: "rain",
        },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OUTFITS:
            return { ...state, outfits: action.outfits };
        case actionTypes.GET_SPECIFIC_OUTFIT:
            return { ...state, selectedOutfit: action.target };
        case actionTypes.CREATE_OUTFIT: {
            const newOutfit = {
                image: action.image,
                satisfactionValue: action.satisfactionValue,
                date: action.date,
                id: action.id,
                items: action.items,
                weather: action.weather,
            };
            const new_outfits = state.outfits.concat(newOutfit);
            return {
                ...state,
                outfits: new_outfits,
                selectedOutfit: newOutfit,
            };
        }
        case actionTypes.DELETE_OUTFIT: {
            const deletedOutfits = state.outfits.filter(outfit => {
                return outfit.id !== action.targetID;
            });
            return { ...state, outfits: deletedOutfits };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
