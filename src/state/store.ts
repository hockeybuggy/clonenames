import { createStore } from "redux";

import { initializeState, rootReducer } from "./reducers";

const createReduxStore = () => {
  return createStore(
    rootReducer,
    initializeState(),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export { createReduxStore };
