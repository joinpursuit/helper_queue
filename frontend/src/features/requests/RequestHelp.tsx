import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../providers/AuthProvider";
import { SocketContext } from "../../providers/SocketProvider";
import { NetworkContext } from "../../providers/NetworkProvider";
import {
  fetchOpenRequest,
  selectRequest,
  createRequest,
  deleteRequest,
  updateRequest,
} from "./requestsSlice";
import "./RequestHelp.css";

export default function RequestHelp() {
  const { currentUser } = useContext(AuthContext);
  const openTicket = useSelector(selectRequest);
  const socket = useContext(SocketContext);
  const network = useContext(NetworkContext);
  const dispatch = useDispatch();

  const fetchRequest = () => {
    dispatch(fetchOpenRequest());
  };

  useEffect(() => {
    fetchRequest();
  }, [network]);

  
  useEffect(() => {
    const adminRemoveRequest = () => {
      dispatch(updateRequest(null))
    };
    socket.on("adminRemoveRequest", adminRemoveRequest);
    return () => {
      socket.off("adminRemoveRequest", adminRemoveRequest);
    }
  }, []);

  const makeRequest = async () => {
    try {
      await dispatch(createRequest());
      currentUser!.socket_id = socket.id
      socket.emit("openRequest", currentUser);
    } catch (error) {}
  };

  const cancelRequest = async () => {
    try {
      await dispatch(deleteRequest(currentUser!.email));
      currentUser!.socket_id = socket.id;
      socket.emit("cancelRequest", currentUser);
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
