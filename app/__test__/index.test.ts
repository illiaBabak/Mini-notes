import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../index";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("App Component", () => {
  it("navigates to notes on button press", () => {
    const { getByTestId } = render(React.createElement(App));
    const button = getByTestId("go-to-notes-button");

    fireEvent.press(button);
    expect(router.push).toHaveBeenCalledWith("/notes");
  });
});
