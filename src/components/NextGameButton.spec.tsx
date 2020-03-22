import { render, fireEvent } from "../testUtils";
import React from "react";

import { UIActions } from "../state/actions";
import NextGameButton from "./NextGameButton";

describe("NextGameButton", () => {
  it("renders a next game button", () => {
    const { container } = render(<NextGameButton dispatch={() => {}} />);

    expect(container).toHaveTextContent("Next game");
  });

  it("dispatches an 'NextGame' action when clicked", () => {
    const dispatch = jest.fn();
    const { getByText } = render(<NextGameButton dispatch={dispatch} />);

    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(getByText("Next game"));

    expect(dispatch).toHaveBeenCalledWith({ type: UIActions.NextGame });
  });
});
