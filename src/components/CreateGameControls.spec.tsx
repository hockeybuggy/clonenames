import { render, act, fireEvent } from "../testUtils";
import React from "react";

import CreateGameControls from "./CreateGameControls";

describe("CreateGameControls", () => {
  describe("Game Code input", () => {
    it("defaults to a random word", () => {
      const { getByLabelText } = render(<CreateGameControls />);

      expect((getByLabelText("Game Code:") as HTMLInputElement).value).toEqual(
        "cargo"
      );
      // TODO this test doesn't match the name
    });
  });
});
