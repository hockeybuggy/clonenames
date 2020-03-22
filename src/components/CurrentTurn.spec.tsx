import { render } from "../testUtils";
import React from "react";

import { GameService } from "../services";
import { Team } from "../types";
import { DEFAULT_WORD_LIST } from "../constants";
import CurrentTurn from "./CurrentTurn";

describe("CurrentTurn", () => {
  it("renders that it's reds turn", () => {
    const game = {
      ...GameService.create("gcode", DEFAULT_WORD_LIST),
      currentTurn: "red" as Team,
    };
    const { container } = render(<CurrentTurn game={game} />);

    expect(container).toHaveTextContent("Red's turn");
  });

  it("renders that it's blue turn", () => {
    const game = {
      ...GameService.create("gcode", DEFAULT_WORD_LIST),
      currentTurn: "blue" as Team,
    };
    const { container } = render(<CurrentTurn game={game} />);

    expect(container).toHaveTextContent("Blue's turn");
  });
});
