import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "../components/NavBar";

describe("Characters component", () => {
  it("navigates to the correct link and updates the URL", () => {
    const charactersPath = "/characters";
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path={charactersPath}
            element={<div data-testid="test-page" />}
          />
          <Route path="*" element={<div></div>} />
        </Routes>
      </BrowserRouter>
    );

    const homeButton = getByText("Home");
    fireEvent.click(homeButton);
    const testPage = screen.getByTestId("test-page");
    expect(window.location.pathname).toEqual("/characters");
    expect(testPage).toBeInTheDocument();
  });
});
