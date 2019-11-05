import * as actionTypes from "../actions/actionTypes";
const initialState = {
    outfits: [
        {
            id: 1,
            items: [
                { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
                { category: "Shoes", tags: ["black", "opentoe"] },
                { category: "LowerBody", tags: ["jeans"] },
                { category: "Accessories", tags: ["black", "golden-buckle"] },
            ],
        },
    ],
    selectedOutfit: {
        id: 1,
        items: [
            { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
            { category: "Shoes", tags: ["black", "opentoe"] },
            { category: "LowerBody", tags: ["jeans"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
        ],
        satisfactionValue: 3,
        date: "2019.11.7",
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
            };
            const new_outfits = state.outfits.concat(newOutfit);
            return { ...state, outfits: new_outfits };
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
