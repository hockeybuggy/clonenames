import React from "react";

import { UIActions } from "../state/actions";
import { useSelector, useDispatch } from "../state/selectors";

const CreateGameControls: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();
  const gameCodeInput = useSelector(state => state.ui.gameCode);
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
        }}
      >
        Create Game
      </button>

      <label htmlFor="word-list-input">Word list:</label>
      <textarea
        id="word-list-input"
        type="text"
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
