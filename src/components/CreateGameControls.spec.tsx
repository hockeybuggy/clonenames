jest.mock("../api");
import { render, fireEvent } from "../testUtils";
import React from "react";

// import { API as mockAPI } from "../api";
import { DEFAULT_WORD_LIST } from "../constants";
import CreateGameControls from "./CreateGameControls";

// TODO fix missing class transform
describe("CreateGameControls", () => {
  describe("Game Code input", () => {
    it("defaults to a random word", () => {
      const { getByLabelText } = render(<CreateGameControls />);

      expect((getByLabelText("Game Code:") as HTMLInputElement).value).toEqual(
        "cargo"
      );
      // TODO this test doesn't match the name
    });

    it("can be changed", () => {
      const { getByLabelText } = render(<CreateGameControls />);

      const input = getByLabelText("Game Code:") as HTMLInputElement;
      expect(input.value).not.toEqual("badger");

      fireEvent.change(input, { target: { value: "badger" } });

      expect(input.value).toEqual("badger");
    });
  });
  describe("Word list input", () => {
    it("defaults to the default english word list", () => {
      const { getByLabelText } = render(<CreateGameControls />);

      const input = getByLabelText("Word list:") as HTMLInputElement;
      expect(input.value).toEqual(DEFAULT_WORD_LIST);
    });

    it("can be changed", () => {
      const { getByLabelText } = render(<CreateGameControls />);

      const input = getByLabelText("Word list:") as HTMLInputElement;
      expect(input.value).toEqual(DEFAULT_WORD_LIST);

      fireEvent.change(input, { target: { value: "two, words" } });

      expect(input.value).toEqual("two, words");
    });
  });
});
