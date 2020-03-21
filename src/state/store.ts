import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { initializeState, rootReducer } from "./reducers";
import rootSaga from "./sagas";

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const createReduxStore = () => {
  const store = createStore(
    rootReducer,
    initializeState(),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export { createReduxStore };
