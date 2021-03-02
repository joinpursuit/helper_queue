import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "../tickets/TicketIndexItem";
import TicketIndexItem from "../tickets/TicketIndexItem";

const ticket = {
  email: "test@test.com",
  id: 1,
  created_at: "2020-05-17 00:43:31.903728",
};

const removeTicket = jest.fn();

describe("TicketIndexItem", () => {
  it("displays the ticket email", () => {
    render(<TicketIndexItem ticket={ticket} removeTicket={removeTicket} />);
    expect(screen.getByText(ticket.email)).toBeInTheDocument();
  });
  it("displays how much time has passed", () => {
    render(<TicketIndexItem ticket={ticket} removeTicket={removeTicket} />);
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });
  it("shows button to mark as complete", () => {
    render(<TicketIndexItem ticket={ticket} removeTicket={removeTicket} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("button calls to remove ticket", () => {
    render(<TicketIndexItem ticket={ticket} removeTicket={removeTicket} />);
    let btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(removeTicket).toHaveBeenCalledTimes(1)
    expect(removeTicket).toHaveBeenCalledWith(ticket)

  });
});
