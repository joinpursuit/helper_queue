import React from "react";
import { render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RequestHelp from "../RequestHelp";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import io from "socket.io-client";

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const off = jest.fn()
  const socket = { emit, on, off };
  return jest.fn(() => socket);
});


jest.mock("axios");

describe("RequestHelp", () => {
  test("shows text Request Help if no previous request", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        openTicket: [],
      },
    });

    render(
      <AuthContext.Provider value={{ token: "1234" }}>
        <RequestHelp />
      </AuthContext.Provider>
    );
     await wait(() => expect(axios).toHaveBeenCalledTimes(1)) 
    const help = await screen.findByText("Request Help");
     expect(help).toBeInTheDocument();
     expect(help.tagName).toBe("BUTTON");
  });
})
