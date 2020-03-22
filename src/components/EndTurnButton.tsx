import React, { Dispatch } from "react";
// import styled from "styled-components";

import { Game } from "../types";
import { ActionTypes, UIActions } from "../state/actions";

const EndTurnButton: React.FC<{
  dispatch: Dispatch<ActionTypes>;
  game: Game;
}> = ({ game, dispatch }) => {
  let buttonText;
  if (game.currentTurn == "red") {
    buttonText = "End red's turn";
  } else {
    buttonText = "End blue's turn";
  }

  return (
    <button
      onClick={() => {
        dispatch({ type: UIActions.EndTurn });
      }}
    >
      {buttonText}
    </button>
  );
};

export default EndTurnButton;
