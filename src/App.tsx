import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
import { createReduxStore } from "./state/store";

import LandingPage from "./scenes/LandingPage";
import GamePage from "./scenes/GamePage";

const store = createReduxStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/:gameCode" component={GamePage} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
};

export { App };
