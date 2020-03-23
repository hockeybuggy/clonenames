import React from "react";
import styled from "styled-components";

import { Game } from "../types";

const RedTurnContainer = styled.div`
  color: red;
`;

const BlueTurnContainer = styled.div`
  color: blue;
`;

const CurrentTurn: React.FC<{
  game: Game;
}> = ({ game }) => {
  if (game.winner !== "NONE") {
    return <p>Game over</p>;
  } else if (game.currentTurn == "red") {
    return <RedTurnContainer>Red's turn</RedTurnContainer>;
  }
  return <BlueTurnContainer>Blue's turn</BlueTurnContainer>;
};

export default CurrentTurn;
