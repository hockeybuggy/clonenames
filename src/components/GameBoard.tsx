import React, { Dispatch } from "react";
import styled from "styled-components";

import { PlayerView, Word, Game } from "../types";
import { ActionTypes, UIActions } from "../state/actions";

const factionColours = {
  redAgent: "#dc322f",
  blueAgent: "#268bd2",
  bystander: "#b58900",
  assassin: "#002b36",
};

const PlayerButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#fdf6e3" : "#eee8d5")};
  color: ${(props) => props.color};
  border-radius: 5px;
  padding: 3vw 1.25vh;
  overflow: hidden;
`;

const CodeMasterButton = styled.button<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 5px;
  padding: 3vw 1.25vh;
  overflow: hidden;
`;

const WordButton: React.FC<{
  alreadyGuessed: boolean;
  word: Word;
  currentView: PlayerView;
  dispatch: Dispatch<ActionTypes>;
}> = ({ alreadyGuessed, currentView, word, dispatch }) => {
  const dispatchSelectWord = () => {
    dispatch({ type: UIActions.SelectWord, word });
  };

  if (currentView === "codeMaster") {
    return (
      <CodeMasterButton
        onClick={dispatchSelectWord}
        backgroundColor={factionColours[word.faction]}
        color={word.faction === "assassin" ? "#eee" : "#333"}
        disabled={alreadyGuessed}
      >
        {word.value}
      </CodeMasterButton>
    );
  }

  return (
    <PlayerButton
      onClick={dispatchSelectWord}
      color={alreadyGuessed ? factionColours[word.faction] : "#073642"}
      disabled={alreadyGuessed}
    >
      {word.value}
    </PlayerButton>
  );
};

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(5, auto);
  grid-gap: 0.25rem;
  color: #eee8d5;
`;

const GameBoard: React.FC<{
  dispatch: Dispatch<ActionTypes>;
  game: Game;
  currentView: PlayerView;
}> = ({ game, currentView, dispatch }) => {
  const guessedWords = game.guesses.reduce((accum, current) => {
    (accum as any)[current.word.value] = 1;
    return accum;
  }, {});
  return (
    <BoardContainer>
      {game.words.map((word) => {
        return (
          <WordButton
            key={word.value}
            alreadyGuessed={(guessedWords as any)[word.value] !== undefined}
            dispatch={dispatch}
            word={word}
            currentView={currentView}
          />
        );
      })}
    </BoardContainer>
  );
};

export default GameBoard;
