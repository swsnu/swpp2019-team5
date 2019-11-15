import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import loginReducer from "./reducers/login";
import itemReducer from "./reducers/item";
import outfitReducer from "./reducers/outfit";
import tagReducer from "./reducers/tag";
import imageReducer from "./reducers/image";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    login: loginReducer,
    item: itemReducer,
    outfit: outfitReducer,
    tagReducer: tagReducer,
    image: imageReducer,
    router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
