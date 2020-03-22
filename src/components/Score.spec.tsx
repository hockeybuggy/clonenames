import { render } from "../testUtils";
import React from "react";

import { GameService } from "../services";

import { DEFAULT_WORD_LIST } from "../constants";
import Score from "./Score";

describe("Score", () => {
  it("renders the number of remaining items for both teams", () => {
    const game = GameService.create("gcode", DEFAULT_WORD_LIST);
    const { container } = render(<Score game={game} />);

    expect(container).toHaveTextContent("9-8");
  });

  it.todo("shows fewer items when things are guessed");
});
