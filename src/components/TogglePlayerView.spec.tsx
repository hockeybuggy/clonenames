import { render, fireEvent } from "../testUtils";
import React from "react";

import { GameService } from "../services";
import { UIActions } from "../state/actions";
// import { Team } from "../types";
import TogglePlayerView from "./TogglePlayerView";

describe("TogglePlayerView", () => {
  it("renders the 'code master' button as enabled when the current is 'player'", () => {
    const { getByText } = render(
      <TogglePlayerView currentView={"player"} dispatch={() => {}} />
    );

    expect(getByText("Player").closest("button")).toBeDisabled();
    expect(getByText("Code Master").closest("button")).not.toBeDisabled();
  });

  it("renders the 'player' button as enabled when the current view is 'codeMaster'", () => {
    const { getByText } = render(
      <TogglePlayerView currentView={"codeMaster"} dispatch={() => {}} />
    );

    expect(getByText("Player").closest("button")).not.toBeDisabled();
    expect(getByText("Code Master").closest("button")).toBeDisabled();
  });

  it("dispatches an 'ChangePlayerView' action with `view` of 'codeMaster' when clicked", () => {
    const dispatch = jest.fn();
    const { getByText } = render(
      <TogglePlayerView currentView={"player"} dispatch={dispatch} />
    );

    expect(getByText("Code Master").closest("button")).not.toBeDisabled();
    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(getByText("Code Master"));

    expect(dispatch).toHaveBeenCalledWith({
      type: UIActions.ChangePlayerView,
      view: "codeMaster",
    });
  });

  it("dispatches an 'ChangePlayerView' action with `view` of 'player' when clicked", () => {
    const dispatch = jest.fn();
    const { getByText } = render(
      <TogglePlayerView currentView={"codeMaster"} dispatch={dispatch} />
    );

    expect(getByText("Player").closest("button")).not.toBeDisabled();
    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(getByText("Player"));

    expect(dispatch).toHaveBeenCalledWith({
      type: UIActions.ChangePlayerView,
      view: "player",
    });
  });
});
