
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { StateType } from "typesafe-actions";

import * as actions from "./actions";
import reducers from "./reducers";
import sagas from "./sagas";

const persistConfig = {
  blacklist: [],
  key: "redux",
  storage,
  transforms: [immutableTransform()],
};

const middleware = [];

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const enhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(...middleware), (window as any).__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(...middleware);

const reducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, {}, enhancers);
export const persistor = persistStore(store);

sagas.map(sagaMiddleware.run);

export type RootState = StateType<typeof reducers>;
export type RootAction = actions.api.Action;
