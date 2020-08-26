import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../providers/AuthProvider";
import { SocketContext } from "../providers/SocketProvider";
import {
  fetchOpenRequest,
  selectRequest,
  createRequest,
  deleteRequest,
} from "../features/requests/requestsSlice";
import "../css/RequestHelp.css";

export default function RequestHelp() {
  const { currentUser } = useContext(AuthContext);
  const openTicket = useSelector(selectRequest);
  const socket = useContext(SocketContext);;
  const dispatch = useDispatch();

  const fetchRequest = () => {
    dispatch(fetchOpenRequest());
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
      await dispatch(createRequest());
      socket.emit("openTicket", currentUser);
    } catch (error) {}
  };

  const cancelRequest = async () => {
    try {
      await dispatch(deleteRequest(openTicket.id));
      socket.emit("closeTicket", "remove ticket");
    } catch (error) {}
  };

  return (
    <div className="requestContainer">
      <button
        onClick={openTicket ? cancelRequest : makeRequest}
        className={openTicket ? "cancelRequest request" : "makeRequest request"}
      >
        {openTicket ? "Cancel Request" : "Request Help"}
      </button>
    </div>
  );
}
