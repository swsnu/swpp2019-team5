import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { middlewares, history } from "../store/store";

const getMockLoginReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockItemReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockOutfitReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockTagReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = (loginState, outfitState, itemState, tagState) => {
    let mockLoginReducer = getMockLoginReducer(loginState);
    let mockOutfitReducer = getMockOutfitReducer(outfitState);
    let mockItemReducer = getMockItemReducer(itemState);
    let mockTagReducer = getMockTagReducer(tagState);

    const rootReducer = combineReducers({
        login: mockLoginReducer,
        item: mockItemReducer,
        outfit: mockOutfitReducer,
        tagReducer: mockTagReducer,
        router: connectRouter(history)
    });
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const mockStore = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    return mockStore;
};
