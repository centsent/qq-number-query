import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("render profile title", () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
