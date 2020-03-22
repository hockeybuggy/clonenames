import { render, fireEvent } from "../testUtils";
import React from "react";

import { GameService } from "../services";

import { DEFAULT_WORD_LIST } from "../constants";
import { UIActions } from "../state/actions";
import GameBoard from "./GameBoard";

describe("GameBoard", () => {
  it("renders all of the words as buttons", () => {
    const dispatch = jest.fn();
    const game = GameService.create("gcode", DEFAULT_WORD_LIST);
    const { getByText } = render(
      <GameBoard game={game} currentView={"player"} dispatch={dispatch} />
    );

    for (let word of game.words) {
      const wordButton = getByText(word.value);
      expect(wordButton).toHaveTextContent(word.value);
    }
  });

  it("dispatches an action when a word is pressed", () => {
    const dispatch = jest.fn();
    const game = GameService.create("gcode", DEFAULT_WORD_LIST);
    const { getByText } = render(
      <GameBoard game={game} currentView={"player"} dispatch={dispatch} />
    );

    const word = game.words[3];
    const wordButton = getByText(word.value);

    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(wordButton);

    expect(dispatch).toHaveBeenCalledWith({ type: UIActions.SelectWord, word });
  });

  it.todo("disables buttons that have already been guessed");
  it.todo("shows the code master what factions are");
});
