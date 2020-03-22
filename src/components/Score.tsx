import React from "react";
import styled from "styled-components";

import { Game } from "../types";

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RedScore = styled.div`
  color: red;
`;

const BlueScore = styled.div`
  color: blue;
`;

const Score: React.FC<{
  game: Game;
}> = ({ game }) => {
  const guessedWords = game.guesses.reduce((accum, current) => {
    (accum as any)[current.word.value] = 1;
    return accum;
  }, {});

  const factionCount: object = game.words.reduce((accum, current) => {
    (accum as any)[current.faction + "-total"] =
      ((accum as any)[current.faction + "-total"] || 0) + 1;
    const wordGuessed: boolean =
      (guessedWords as any)[current.value] !== undefined;
    (accum as any)[current.faction + "-unguessed"] =
      ((accum as any)[current.faction + "-unguessed"] || 0) +
      (wordGuessed ? 0 : 1);
    return accum;
  }, {});

  const numberOfRedAgent = (factionCount as any)["redAgent-total"] as number;
  const numberOfBlueAgent = (factionCount as any)["blueAgent-total"] as number;
  const remainingRed = (factionCount as any)["redAgent-unguessed"] as number;
  const remainingBlue = (factionCount as any)["blueAgent-unguessed"] as number;
  if (numberOfRedAgent > numberOfBlueAgent) {
    return (
      <ScoreContainer>
        <RedScore>{remainingRed}</RedScore>
        <span>-</span>
        <BlueScore>{remainingBlue}</BlueScore>
      </ScoreContainer>
    );
  }
  return (
    <ScoreContainer>
      <BlueScore>{remainingBlue}</BlueScore>
      <span>-</span>
      <RedScore>{remainingRed}</RedScore>
    </ScoreContainer>
  );
};

export default Score;
