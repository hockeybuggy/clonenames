import React, { Dispatch } from "react";
import styled from "styled-components";

import { Word, Game } from "../types";
import { ActionTypes, UIActions } from "../state/actions";

const factionColours = {
  redAgent: "#dc322f",
  blueAgent: "#268bd2",
  bystander: "#b58900",
  assassin: "#002b36",
};

const Button = styled.button`
  background-color: #eee8d5;
  color: ${props => props.color};
  border-radius: 5px;
  padding: 20px;
`;

const WordButton: React.FC<{
  alreadyGuessed: boolean;
  word: Word;
  dispatch: Dispatch<ActionTypes>;
}> = ({ alreadyGuessed, word, dispatch }) => {
  return (
    <Button
      onClick={() => {
        dispatch({ type: UIActions.SelectWord, word });
      }}
      color={alreadyGuessed ? factionColours[word.faction] : "#073642"}
    >
      {word.value}
    </Button>
  );
};

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 18vw);
  grid-template-rows: repeat(5, 16vw);
  grid-gap: 10px;
  color: #eee8d5;
`;

const GameBoard: React.FC<{
  dispatch: Dispatch<ActionTypes>;
  game: Game;
}> = ({ game, dispatch }) => {
  const guessedWords = game.guesses.reduce((accum, current) => {
    (accum as any)[current.word.value] = 1;
    return accum;
  }, {});
  return (
    <BoardContainer>
      {game.words.map(word => {
        return (
          <WordButton
            key={word.value}
            alreadyGuessed={(guessedWords as any)[word.value] !== undefined}
            dispatch={dispatch}
            word={word}
          />
        );
      })}
    </BoardContainer>
  );
};

export default GameBoard;
