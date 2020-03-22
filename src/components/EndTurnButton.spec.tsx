import { render, fireEvent } from "../testUtils";
import React from "react";

import { GameService } from "../services";
import { UIActions } from "../state/actions";
import { Team } from "../types";
import { DEFAULT_WORD_LIST } from "../constants";
import EndTurnButton from "./EndTurnButton";

describe("EndTurnButton", () => {
  it("renders that it's reds turn", () => {
    const game = {
      ...GameService.create("gcode", DEFAULT_WORD_LIST),
      currentTurn: "red" as Team,
    };
    const { container } = render(
      <EndTurnButton game={game} dispatch={() => {}} />
    );

    expect(container).toHaveTextContent("End red's turn");
  });

  it("renders that it's blue turn", () => {
    const game = {
      ...GameService.create("gcode", DEFAULT_WORD_LIST),
      currentTurn: "blue" as Team,
    };
    const { container } = render(
      <EndTurnButton game={game} dispatch={() => {}} />
    );

    expect(container).toHaveTextContent("End blue's turn");
  });

  it("dispatches an 'EndTurn' action when clicked", () => {
    const dispatch = jest.fn();
    const game = {
      ...GameService.create("gcode", DEFAULT_WORD_LIST),
      currentTurn: "red" as Team,
    };
    const { getByText } = render(
      <EndTurnButton game={game} dispatch={dispatch} />
    );

    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(getByText("End red's turn"));

    expect(dispatch).toHaveBeenCalledWith({ type: UIActions.EndTurn });
  });
});
