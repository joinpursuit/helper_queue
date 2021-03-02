import React from "react";
import { Provider } from "react-redux";
import store from "../../store";

import { render, screen, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RequestHelp from "../requests/RequestHelp";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import io from "socket.io-client";
import { act } from "react-dom/test-utils";
import { SocketContext } from "../../providers/SocketProvider";

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const off = jest.fn();
  const socket = { emit, on, off };
  return jest.fn(() => socket);
});

const API = apiURL();

jest.mock("axios");
jest.mock("../requests/requestsSlice");

axios.get();

afterEach(() => {
  jest.clearAllMocks();
});

const currentUser = { email: "test@test.com" };

const renderElement = (
  <Provider store={store}>
    <AuthContext.Provider value={{ token: "1234", currentUser }}>
      <SocketContext.Provider value={io}>
        <RequestHelp />
      </SocketContext.Provider>
    </AuthContext.Provider>
  </Provider>
);

test("shows text Request Help if no previous request", async () => {
  axios.mockResolvedValue({ data: { openTicket: [] } });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByText("Request Help");
  expect(help).toBeInTheDocument();
  expect(help.tagName).toBe("BUTTON");
});

test("shows text 'Cancel Request' if previous request", async () => {
  axios.mockResolvedValueOnce({
    data: {
      openTicket: [{ id: 1 }],
    },
  });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByText("Cancel Request");
  expect(help).toBeInTheDocument();
  expect(help.tagName).toBe("BUTTON");
});

it("makes a post request to create a ticket", async () => {
  axios.mockResolvedValueOnce({
    data: {
      openTicket: [],
    },
  });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
  act(() => {
    fireEvent.click(help);
  });

  expect(axios).toHaveBeenCalledWith({
    method: "post",
    url: `${API}/api/tickets`,
    headers: {
      AuthToken: "1234",
    },
    data: {
      body: "",
    },
  });
});

it("makes a delete request to cancel a ticket", async () => {
  axios.mockResolvedValueOnce({
    data: {
      openTicket: [{ id: 1 }],
    },
  });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
  act(() => {
    fireEvent.click(help);
  });

  expect(axios).toHaveBeenCalledWith({
    method: "delete",
    url: `${API}/api/tickets/close_tickets/1`,
    headers: {
      AuthToken: "1234",
    },
  });
});

test("socket listens for ticketClose on mount", async () => {
  render(renderElement);

  expect(io().on).toHaveBeenCalledTimes(1);
  expect(io().on.mock.calls[0][0]).toEqual("ticketClose");
});

test("socket stops listening for tickentClose on unmount", async () => {
  const { unmount } = render(renderElement);
  unmount();
  expect(io().off.mock.calls[0][0]).toEqual("ticketClose");
});

it("emits openTicket and currentUser when request is made", async () => {
  axios.mockResolvedValueOnce({
    data: {
      openTicket: [],
    },
  });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
  act(() => {
    fireEvent.click(help);
  });

  await wait(() => expect(axios).toHaveBeenCalled());

  expect(io().emit).toHaveBeenCalledWith("openTicket", currentUser);
});

it("emits closeTicket and remove ticket when request is canceled", async () => {
  axios.mockResolvedValueOnce({
    data: {
      openTicket: [{ id: 1 }],
    },
  });

  render(renderElement);
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
  act(() => {
    fireEvent.click(help);
  });

  await wait(() => expect(axios).toHaveBeenCalled());

  expect(io().emit).toHaveBeenCalledWith("closeTicket", "remove ticket");
});
