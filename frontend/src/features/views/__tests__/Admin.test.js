import React from "react";
import { render, screen } from "@testing-library/react";
import "../Student";
import Admin from "../Admin";

jest.mock("../../tickets/TicketIndex", () => () => <div data-testid="queue"/>)

it("renders the queue", () => {
  render(<Admin />);
  expect(screen.getByTestId(/queue/)).toBeInTheDocument();
});
