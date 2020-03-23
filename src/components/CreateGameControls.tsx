import React from "react";
import styled from "styled-components";

import { GameActions, UIActions } from "../state/actions";
import { useSelector, useDispatch, getGameCode } from "../state/selectors";

const CreateGameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input {
    width: 70%;
  }

  button {
    width: 30%;
  }
`;

const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CreateGameControls: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const dispatch = useDispatch();
  const gameCodeInput = useSelector(getGameCode);
  const wordsListInput = useSelector((state) => state.ui.wordsList);
  return (
    <div>
      <InputLabelContainer>
        <label htmlFor="game-code-input">Game Code:</label>
        <CreateGameContainer>
          <input
            id="game-code-input"
            type="text"
            value={gameCodeInput}
            onChange={(newValue) => {
              dispatch({
                type: UIActions.UpdateGameCodeInput,
                value: newValue.target.value,
              });
            }}
          />

          <button
            disabled={isLoading}
            onClick={() => {
              dispatch({ type: GameActions.CreateGame });
            }}
          >
            {isLoading ? "Creating" : "Create Game"}
          </button>
        </CreateGameContainer>
      </InputLabelContainer>

      <InputLabelContainer>
        <label htmlFor="word-list-input">Word list:</label>
        <textarea
          id="word-list-input"
          value={wordsListInput}
          onChange={(newValue) => {
            dispatch({
              type: UIActions.UpdateWordsListInput,
              value: newValue.target.value,
            });
          }}
        />
      </InputLabelContainer>
    </div>
  );
};

export default CreateGameControls;
