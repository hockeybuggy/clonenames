import React from "react";

import { GameActions, UIActions } from "../state/actions";
import { useSelector, useDispatch, getGameCode } from "../state/selectors";

const CreateGameControls: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();
  const gameCodeInput = useSelector(getGameCode);
  const wordsListInput = useSelector(state => state.ui.wordsList);
  return (
    <div>
      <label htmlFor="game-code-input">Game Code:</label>
      <input
        id="game-code-input"
        type="text"
        value={gameCodeInput}
        onChange={newValue => {
          dispatch({
            type: UIActions.UpdateGameCodeInput,
            value: newValue.target.value,
          });
        }}
      />

      <button
        onClick={() => {
          console.log("create game");
          dispatch({ type: GameActions.CreateGame });
        }}
      >
        Create Game
      </button>

      <label htmlFor="word-list-input">Word list:</label>
      <textarea
        id="word-list-input"
        value={wordsListInput}
        onChange={newValue => {
          dispatch({
            type: UIActions.UpdateWordsListInput,
            value: newValue.target.value,
          });
        }}
      />
    </div>
  );
};

export default CreateGameControls;
