import React, { useContext, useEffect, useState } from "react";
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
  const socket = useContext(SocketContext);;
  const network = useContext(NetworkContext);;
  const [ requestInput, setRequestInput ] = useState("");
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
    return () => socket.off("adminRemoveRequest", adminRemoveRequest);
  }, []);

  const makeRequest = async () => {
    try {
      await dispatch(createRequest(requestInput));
      currentUser.socket_id = socket.id
      currentUser.body = requestInput;
      socket.emit("openRequest", currentUser);
    } catch (error) {}
  };

  const cancelRequest = async () => {
    try {
      await dispatch(deleteRequest(currentUser.email));
      currentUser.socket_id = socket.id;
      socket.emit("cancelRequest", currentUser);
    } catch (error) {}
  };

  return (
    <div className="requestContainer">
      { !openTicket &&
        <input value={requestInput} placeholder="How can we help?" onChange={(e)=>setRequestInput(e.target.value)} />
      }
      <button
        onClick={openTicket ? cancelRequest : makeRequest}
        className={openTicket ? "cancelRequest request" : "makeRequest request"}
      >
        {openTicket ? "Cancel Request" : "Request Help"}
      </button>
    </div>
  );
}
