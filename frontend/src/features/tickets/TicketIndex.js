import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../providers/SocketProvider";
import { NetworkContext } from "../../providers/NetworkProvider";
import {
  selectTickets,
  fetchOpenTickets,
  destroyTicket,
  receiveTicket,
  removeTicket,
} from "./ticketsSlice";
import TicketIndexItem from "./TicketIndexItem";
import Checkbox from "../../UtilComponents/Checkbox";
import alertSound from "../../assets/that-was-quick.mp3";
import "./TicketIndex.css";

export default function TicketIndex() {


  let initialSevenOne = window.localStorage.getItem("sevenOne");
  let initialSevenTwo = window.localStorage.getItem("sevenTwo");

  let initialEightOne = window.localStorage.getItem("eightOne");
  let initialEightTwo = window.localStorage.getItem("eightTwo");


  const [sevenOne, setSevenOne] = useState(
    initialSevenOne === "true" || initialSevenOne === null
  );
  const [sevenTwo, setSevenTwo] = useState(
    initialSevenTwo === "true" || initialSevenTwo === null
  );

  const [eightOne, setEightOne] = useState(
    initialEightOne === "true" || initialEightOne === null
  );
  const [eightTwo, setEightTwo] = useState(
    initialEightTwo === "true" || initialEightTwo === null
  );




  useEffect(() => {

    window.localStorage.setItem("sevenOne", sevenOne);
    window.localStorage.setItem("sevenTwo", sevenTwo);
    window.localStorage.setItem("eightOne", eightOne);
    window.localStorage.setItem("eightTwo", eightTwo);
    return () => {

      window.localStorage.setItem("sevenOne", sevenOne);
      window.localStorage.setItem("sevenTwo", sevenTwo);
      window.localStorage.setItem("eightOne", eightOne);
      window.localStorage.setItem("eightTwo", eightTwo);
    };
  }, [sevenOne, sevenTwo, eightOne, eightTwo]);

  const legend = {
    8.2: eightTwo,
    8.1: eightOne,
    7.2: sevenTwo,
    7.1: sevenOne
  };

  const socket = useContext(SocketContext);
  const network = useContext(NetworkContext);
  const tickets = useSelector(selectTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpenTickets());
  }, [network]);

  useEffect(() => {
    const cancelRequest = (user) => {
      dispatch(removeTicket(user.email));
    };
    socket.on("cancelRequest", cancelRequest);
    return () => socket.off("cancelRequest", cancelRequest);
  });
  useEffect(() => {
    const updateTickets = (email) => {
      dispatch(removeTicket(email));
    };
    socket.on("updateTickets", updateTickets);
    return () => socket.off("updateTickets", updateTickets);
  });

  useEffect(() => {
    const playSound = (ticket) => {
      if (legend[ticket.class]) {
        let src = alertSound;
        let audio = new Audio(src);
        audio.play();
      }
      ticket.created_at = Date.now();
      dispatch(receiveTicket(ticket));
    };
    socket.on("newTicket", playSound);
    return () => socket.off("newTicket", playSound);
  }, [sevenOne, sevenTwo, eightOne, eightTwo]);

  const adminRemoveTicket = async (ticket) => {
    await dispatch(destroyTicket(ticket));
    socket.emit("adminRemoveTicket", ticket);
  };

  const showTickets = () => {
    if (tickets.length) {
      return (
        <table className="ticketTable">
          <tbody>
            <tr>
              <th>User</th>
              <th>Issue</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
            {tickets.map((ticket) => {
              if (legend[ticket.class]) {
                return (
                  <TicketIndexItem
                    key={ticket.id}
                    ticket={ticket}
                    removeTicket={adminRemoveTicket}
                  />
                );
              }
            })}
          </tbody>
        </table>
      );
    } else {
      return <div>No Students Waiting</div>;
    }
  };

  const showCheckBoxes = () => {
    const classList = [
      { classTitle: sevenOne, setClass: setSevenOne, labelText: "7.1" },
      { classTitle: sevenTwo, setClass: setSevenTwo, labelText: "7.2" },
      { classTitle: eightOne, setClass: setEightOne, labelText: "8.1" },
      { classTitle: eightTwo, setClass: setEightTwo, labelText: "8.2" },
    ];
    return (
      <form className="classListContainer">
        {classList.map(({ classTitle, setClass, labelText }, i) => {
          return (
            <Checkbox
              key={i}
              classStyle={classTitle ? "checked" : "notChecked"}
              labelText={labelText}
              checked={classTitle}
              handleChange={() => setClass((p) => !p)}
            />
          );
        })}
      </form>
    );
  };

  return (
    <div className="adminContainer">
      <h1>Student Queue</h1>
      {showCheckBoxes()}
      {showTickets()}
    </div>
  );
}
