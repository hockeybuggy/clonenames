import React, { Dispatch } from "react";
// import styled from "styled-components";

import { ActionTypes, UIActions } from "../state/actions";

const NextGameButton: React.FC<{
  dispatch: Dispatch<ActionTypes>;
}> = ({ dispatch }) => {
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: UIActions.NextGame });
        }}
      >
        Next game
      </button>
    </div>
  );
};

export default NextGameButton;
