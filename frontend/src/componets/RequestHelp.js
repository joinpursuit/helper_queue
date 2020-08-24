import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../util/apiURL";
import { AuthContext } from "../providers/AuthProvider";
import {
  fetchOpenRequest,
  selectRequest,
  createRequest,
  deleteRequest,
} from "../features/requests/requestsSlice";
import socketIOClient from "socket.io-client";
import "../css/RequestHelp.css";
import { fetchOpenTickets } from "../features/tickets/ticketsSlice";
import axios from 'axios'

export default function RequestHelp() {
  const [isWaitingForHelp, setIsWaitingForHelp] = useState(false);
  const [openTicket, setOpenTicket] = useState(null);
  const { currentUser,token } = useContext(AuthContext);
  // const openTicket = useSelector(selectRequest);
  const API = apiURL();
  const socket = socketIOClient(API);
  // const dispatch = useDispatch();
  const fetchOpenTicket = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${API}/api/tickets/open_tickets/`,
        headers: {
          AuthToken: token,
        },
      });
      debugger
      if (res.data.openTicket.length) {
        setIsWaitingForHelp(true);
        setOpenTicket(res.data.openTicket[0]);
      } else {
        setIsWaitingForHelp(false);
        setOpenTicket(null);
      }
    } catch (error) {
      setIsWaitingForHelp(false);
      setOpenTicket(null);
    }
  };
  const fetchRequest = () => {
    fetchOpenTicket()
    // dispatch(fetchOpenTicket());
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    socket.on("ticketClose", fetchRequest);
    return () => socket.off("ticketClose", fetchRequest);
  }, []);

  const makeRequest = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${API}/api/tickets`,
        headers: {
          AuthToken: token,
        },
        data: {
          body: "",
        },
      });
      // dispatch(createRequest());
      socket.emit("openTicket", currentUser);
      fetchRequest();
    } catch (error) {
      fetchRequest();
    }
  };

  const cancelRequest = async () => {
    try {
      // dispatch(deleteRequest(openTicket.id));
      let res = await axios({
        method: "delete",
        url: `${API}/api/tickets/close_tickets/${openTicket.id}`,
        headers: {
          AuthToken: token,
        },
      });
      socket.emit("closeTicket", "remove ticket");
      fetchRequest();
    } catch (error) {
      fetchRequest();
    }
  };

  return (
    <div className="requestContainer">
      <button
        onClick={isWaitingForHelp ? cancelRequest : makeRequest}
        className={isWaitingForHelp ? "cancelRequest request" : "makeRequest request"}
      >
        {isWaitingForHelp ? "Cancel Request" : "Request Help"}
      </button>
    </div>
  );
}
