import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Notes from "..";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: () => "test-uuid",
}));

describe("Notes", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
  });

  it("should render initial state correctly", async () => {
    const { getByTestId } = render(React.createElement(Notes));

    await waitFor(() => {
      expect(getByTestId("notes-title")).toBeTruthy();
      expect(getByTestId("add-note-button")).toBeTruthy();
      expect(getByTestId("notes-list")).toBeTruthy();
    });
  });

  it("should show modal when add button is pressed", async () => {
    const { getByTestId } = render(React.createElement(Notes));

    await waitFor(() => {
      expect(getByTestId("add-note-button")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByTestId("add-note-button"));
    });

    expect(getByTestId("note-modal")).toBeTruthy();
    expect(getByTestId("modal-content")).toBeTruthy();
  });

  it("should load notes from AsyncStorage on mount", async () => {
    const mockNotes = [
      { id: "1", title: "Test Note 1", type: "text" },
      { id: "2", title: "Test Note 2", type: "text" },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockNotes)
    );

    const { getByTestId } = render(React.createElement(Notes));

    await waitFor(() => {
      expect(getByTestId(`note-${mockNotes[0].id}`)).toBeTruthy();
      expect(getByTestId(`note-${mockNotes[1].id}`)).toBeTruthy();
      expect(getByTestId(`note-title-${mockNotes[0].id}`)).toHaveTextContent(
        "Test Note 1"
      );
      expect(getByTestId(`note-type-${mockNotes[0].id}`)).toHaveTextContent(
        "text"
      );
    });
  });

  it("should delete a note when close button is pressed", async () => {
    const mockNotes = [
      { id: "1", title: "Test Note 1", type: "text" },
      { id: "2", title: "Test Note 2", type: "text" },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockNotes)
    );

    const { getByTestId, queryByTestId } = render(React.createElement(Notes));

    await waitFor(() => {
      expect(getByTestId(`note-${mockNotes[0].id}`)).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByTestId(`delete-note-${mockNotes[0].id}`));
    });

    await waitFor(() => {
      expect(queryByTestId(`note-${mockNotes[0].id}`)).toBeNull();
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@notes",
      JSON.stringify([mockNotes[1]])
    );
  });
});
