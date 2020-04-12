import React, { useEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";

import {
  useSelector,
  useDispatch,
  getCurrentGame,
  getCurrentPlayerView,
} from "../state/selectors";
import { GameActions } from "../state/actions";
import { GameDataState } from "../state/reducers";

import Layout from "../components/Layout";
import GameBoard from "../components/GameBoard";
import Score from "../components/Score";
import CurrentTurn from "../components/CurrentTurn";
import EndTurnButton from "../components/EndTurnButton";
import TogglePlayerView from "../components/TogglePlayerView";
import NextGameButton from "../components/NextGameButton";

type GamePageProps = {};

const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const GameHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const GameFooterContainer = GameHeaderContainer;
const PageFooterContainer = GameHeaderContainer;

const GamePage: React.FC<GamePageProps & RouteComponentProps> = ({ match }) => {
  const [loadState, currentTimestamp, currentGameState] = useSelector(
    getCurrentGame
  );
  const currentView = useSelector(getCurrentPlayerView);
  const dispatch = useDispatch();
  useEffect(() => {
    const gameCode = (match.params as { gameCode: string | null })?.gameCode;
    if (gameCode) {
      dispatch({ type: GameActions.LoadGame, gameCode: gameCode });
    }
  }, []);

  if (
    !(
      loadState === GameDataState.Complete ||
      loadState === GameDataState.Updating
    )
  ) {
    return <div>Loading</div>;
  }
  if (!currentGameState) {
    return;
  }

  return (
    <Layout>
      <GamePageContainer>
        <div>
          <h1>Clonenames</h1>
          <p>
            Send this link to your friends:
            <a href={`/${currentGameState.code}`}>
              https://hockeybuggy-clonenames.netlify.com/{currentGameState.code}
            </a>
          </p>
        </div>

        <div>
          <GameHeaderContainer>
            <Score game={currentGameState} />
            <CurrentTurn game={currentGameState} />
            <EndTurnButton dispatch={dispatch} game={currentGameState} />
          </GameHeaderContainer>
          <GameBoard
            currentView={currentView}
            dispatch={dispatch}
            game={currentGameState}
          />
          <GameFooterContainer>
            <TogglePlayerView dispatch={dispatch} currentView={currentView} />
            <NextGameButton dispatch={dispatch} />
          </GameFooterContainer>
        </div>

        <PageFooterContainer>
          <p>
            {loadState === GameDataState.Complete ? (
              <span title={`Current game timestamp: ${currentTimestamp}`}>
                🟢
              </span>
            ) : (
              <span title="Updating">🟡</span>
            )}
          </p>

          <p>
            Created by{" "}
            <a href="https://twitter.com/hockeybuggy">@hockeybuggy</a>◆
            <a href="https://github.com/hockeybuggy/clonenames/">
              GitHub source
            </a>
          </p>
        </PageFooterContainer>
      </GamePageContainer>
    </Layout>
  );
};
export default GamePage;
