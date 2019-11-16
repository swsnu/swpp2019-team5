import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";

import { middlewares, history } from "../store/store";

const getMockLoginReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

const getMockItemReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

const getMockOutfitReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

const getMockTagReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

const getMockWeatherReducer = jest.fn(
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
) => {
    let mockLoginReducer = getMockLoginReducer(loginState);
    let mockOutfitReducer = getMockOutfitReducer(outfitState);
    let mockItemReducer = getMockItemReducer(itemState);
    let mockTagReducer = getMockTagReducer(tagState);
    let mockWeatherReducer = getMockWeatherReducer(weatherState);

    const rootReducer = combineReducers({
        login: mockLoginReducer,
        item: mockItemReducer,
        outfit: mockOutfitReducer,
        tag: mockTagReducer,
        weather: mockWeatherReducer,
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
