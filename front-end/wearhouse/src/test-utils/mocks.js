import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import thunk from 'redux-thunk';
import { connectRouter } from "connected-react-router";
//import { createBrowserHistory } from 'history';

import { history, middlewares } from "../store/store";
//import * as actionTypes from '../store/actions/actionTypes';

const getMockReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    },
);

export const getMockStore = initialState => {
    const mockOutfitReducer = getMockReducer(initialState);
    const mockItemReducer = getMockReducer(initialState);
    const mockLoginReducer = getMockReducer(initialState);
    const mockTagReducer = getMockReducer(initialState);
    const mockImageReducer = getMockReducer(initialState);

    const mockWeatherReducer = getMockReducer(initialState);
    const rootReducer = combineReducers({
        outfit: mockOutfitReducer,
        item: mockItemReducer,
        login: mockLoginReducer,
        tag: mockTagReducer,
        image: mockImageReducer,
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
