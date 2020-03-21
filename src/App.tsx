import React from "react";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";

import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import { createReduxStore } from "./state/store";
// import { GameActions } from "./state/actions";

import LandingPage from "./scenes/LandingPage";
import GamePage from "./scenes/GamePage";

const history = createBrowserHistory();

const store = createReduxStore();

// const TriggerLoadListings = (): null => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch({ type: ListingsActions.LoadListings });
//   });
//   return null;
// };

const App = () => {
  return (
    <div className="app-container">
      <ReduxProvider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/:gameCode" component={GamePage} />
          </Switch>
        </Router>
      </ReduxProvider>
    </div>
  );
};

export { App };
