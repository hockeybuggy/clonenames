import React from "react";
import { Redirect, RouteProps } from "react-router";

import CreateGameControls from "../components/CreateGameControls";
import Layout from "../components/Layout";
import { GameDataState } from "../state/reducers";
import { getCurrentGame, useSelector } from "../state/selectors";

type LandingPageProps = { props: {} };

const LandingPage: React.FC<LandingPageProps & RouteProps> = ({}) => {
  const [loadState, _, currentGameState] = useSelector(getCurrentGame);
  if (loadState === GameDataState.CreateGameComplete) {
    return <Redirect to={`/${currentGameState.code}`} />;
  }

  return (
    <Layout>
      <div>
        <h1>Clonenames</h1>
        <CreateGameControls
          isLoading={loadState === GameDataState.CreateGameLoading}
        />
      </div>
    </Layout>
  );
};
export default LandingPage;
