import React, { Dispatch } from "react";

import { Word, Game } from "../types";
import { ActionTypes, UIActions } from "../state/actions";

const WordButton: React.FC<{ word: Word; dispatch: Dispatch<ActionTypes> }> = ({
  word,
  dispatch,
}) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: UIActions.SelectWord, word });
      }}
    >
      {word.value}
    </button>
  );
};

const GameBoard: React.FC<{
  dispatch: Dispatch<ActionTypes>;
  game: Game;
}> = ({ game, dispatch }) => {
  return (
    <div>
      {game.words.map(word => {
        return <WordButton key={word.value} word={word} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default GameBoard;
