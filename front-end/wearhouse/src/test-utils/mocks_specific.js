import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";

import { middlewares, history } from "../store/store";

const getMockReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

export const getMockStore = (
    loginState,
    itemState,
    outfitState,
    tagState,
    weatherState,
    imageState,
) => {
    let mockLoginReducer = getMockReducer(loginState);
    let mockItemReducer = getMockReducer(itemState);
    let mockOutfitReducer = getMockReducer(outfitState);
    let mockTagReducer = getMockReducer(tagState);
    let mockWeatherReducer = getMockReducer(weatherState);
    let mockImageReducer = getMockReducer(imageState);

    const rootReducer = combineReducers({
        login: mockLoginReducer,
        item: mockItemReducer,
        outfit: mockOutfitReducer,
        tag: mockTagReducer,
        weather: mockWeatherReducer,
        image: mockImageReducer,
        router: connectRouter(history),
    });
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const mockStore = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
    return mockStore;
};
