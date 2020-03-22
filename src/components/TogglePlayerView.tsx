import React, { Dispatch } from "react";
// import styled from "styled-components";

import { PlayerView } from "../types";
import { ActionTypes, UIActions } from "../state/actions";

const TogglePlayerView: React.FC<{
  dispatch: Dispatch<ActionTypes>;
  currentView: PlayerView;
}> = ({ currentView, dispatch }) => {
  return (
    <div>
      <button
        disabled={currentView === "player"}
        onClick={() => {
          dispatch({ type: UIActions.ChangePlayerView, view: "player" });
        }}
      >
        Player
      </button>
      <button
        disabled={currentView === "codeMaster"}
        onClick={() => {
          dispatch({ type: UIActions.ChangePlayerView, view: "codeMaster" });
        }}
      >
        Code Master
      </button>
    </div>
  );
};

export default TogglePlayerView;
