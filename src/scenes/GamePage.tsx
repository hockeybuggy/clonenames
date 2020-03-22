import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router";

import { useSelector, useDispatch, getCurrentGame } from "../state/selectors";
import { GameActions } from "../state/actions";
import { GameDataState } from "../state/reducers";

import GameBoard from "../components/GameBoard";
import Score from "../components/Score";

type GamePageProps = {};

const GamePage: React.FC<GamePageProps & RouteComponentProps> = ({ match }) => {
  const [loadState, currentTimestamp, currentGameState] = useSelector(
    getCurrentGame
  );
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
    <div>
      <h1>GamePage</h1>
      <div>
        <p>{currentTimestamp}</p>
        Send this link to your friends
        <a href={`/${currentGameState.code}`}>Send this link to friends</a>
        <Score game={currentGameState} />
        <GameBoard dispatch={dispatch} game={currentGameState} />
      </div>
    </div>
  );
};
export default GamePage;
