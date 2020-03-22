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

const GameHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const GameFooterContainer = GameHeaderContainer;

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

  if (loadState != GameDataState.Complete) {
    return <div>Loading</div>;
  }
  if (!currentGameState) {
    return;
  }

  return (
    <Layout>
      <h1>Clonenames</h1>
      <div>
        Send this link to your friends
        <a href={`/${currentGameState.code}`}>Send this link to friends</a>
        <GameHeaderContainer>
          <Score game={currentGameState} />
          <CurrentTurn game={currentGameState} />
          <EndTurnButton dispatch={dispatch} game={currentGameState} />
        </GameHeaderContainer>
        <GameBoard dispatch={dispatch} game={currentGameState} />
        <GameFooterContainer>
          <p>{currentTimestamp}</p>
          <TogglePlayerView dispatch={dispatch} currentView={currentView} />
          <NextGameButton dispatch={dispatch} />
        </GameFooterContainer>
      </div>
    </Layout>
  );
};
export default GamePage;
