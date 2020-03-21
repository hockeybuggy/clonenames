import React from "react";

import { UIActions } from "../state/actions";
import { useSelector, useDispatch } from "../state/selectors";

const CreateGameControls: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();
  const gameCodeInput = useSelector(state => state.ui.gameCode);
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
      <div>word list here</div>
    </div>
  );
};

export default CreateGameControls;
