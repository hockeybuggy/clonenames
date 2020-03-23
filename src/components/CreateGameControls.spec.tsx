// jest.mock("../api");
import { render, fireEvent } from "../testUtils";
import React from "react";

// import { API as mockAPI } from "../api";
import { DEFAULT_WORD_LIST } from "../constants";
import CreateGameControls from "./CreateGameControls";

describe("CreateGameControls", () => {
  describe("Game Code input", () => {
    it("defaults to a random word of length 9", () => {
      const { getByLabelText } = render(
        <CreateGameControls isLoading={false} />
      );

      expect(
        (getByLabelText("Game Code:") as HTMLInputElement).value.length
      ).toEqual(9);
    });
    // TODO this test doesn't account for the use of window.history in the `initializeState` function

    it("can be changed", () => {
      const { getByLabelText } = render(
        <CreateGameControls isLoading={false} />
      );

      const input = getByLabelText("Game Code:") as HTMLInputElement;
      expect(input.value).not.toEqual("badger");

      fireEvent.change(input, { target: { value: "badger" } });

      expect(input.value).toEqual("badger");
    });
  });

  describe("Word list input", () => {
    it("defaults to the default english word list", () => {
      const { getByLabelText } = render(
        <CreateGameControls isLoading={false} />
      );

      const input = getByLabelText("Word list:") as HTMLInputElement;
      expect(input.value).toEqual(DEFAULT_WORD_LIST);
    });

    it("can be changed", () => {
      const { getByLabelText } = render(
        <CreateGameControls isLoading={false} />
      );

      const input = getByLabelText("Word list:") as HTMLInputElement;
      expect(input.value).toEqual(DEFAULT_WORD_LIST);

      fireEvent.change(input, { target: { value: "two, words" } });

      expect(input.value).toEqual("two, words");
    });
  });

  it.todo("shows it's loading ");
  it.todo("disabled the create button when it's loading ");
});
