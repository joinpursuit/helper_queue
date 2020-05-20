import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { apiURL } from "../../util/apiURL";
import { AuthContext } from "../../providers/AuthProvider";
import TicketIndexItem from "./TicketIndexItem";
import alertSound from "../../assets/that-was-quick.mp3";
import "../../css/TicketIndex.css";

export default function TicketIndex() {
  const [tickets, setTickets] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sixFour, setSixFour] = useState(true);
  const [sixThree, setSixThree] = useState(true);
  const [sixTwo, setSixTwo] = useState(true);
  const [sixOne, setSixOne] = useState(true);

  const legend = {
    "6.4": sixFour,
    "6.3": sixThree,
    "6.2": sixTwo,
    "6.1": sixOne,
  };

  const API = apiURL();
  const { token } = useContext(AuthContext);
  const socket = socketIOClient(API);
  const fetchOpenTickets = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${API}/api/tickets`,
        headers: {
          AuthToken: token,
        },
      });
      setTickets(res.data.tickets);
      setClasses(
        [...new Set(res.data.tickets.map((ticket) => ticket.class))].sort()
      );
    } catch (err) {
      //    console.log(err);
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchOpenTickets();
    socket.on("updateTickets", fetchOpenTickets);
    return () => socket.off("updateTickets", fetchOpenTickets);
  }, []);

  useEffect(() => {
    socket.on("ticketClose", fetchOpenTickets);
    return () => socket.off("ticketClose", fetchOpenTickets);
  });

  useEffect(() => {
    const playSound = () => {
      let src = alertSound;
      let audio = new Audio(src);
      audio.play();
    };
    socket.on("newTicket", playSound);
    return () => socket.off("newTicket", playSound);
  }, []);

  const removeTicket = async (id) => {
    try {
      let res = await axios({
        method: "delete",
        url: `${API}/api/tickets/close_tickets/${id}`,
        headers: {
          AuthToken: token,
        },
      });
      socket.emit("ticketClosed");
      fetchOpenTickets();
    } catch (error) {
      fetchOpenTickets();
    }
  };

  const showTickets = () => {
    if (tickets.length) {
      return (
        <>
          <ol>
            {tickets.map((ticket) => {
              if (legend[ticket.class] !== false) {
                return (
                  <TicketIndexItem
                    key={ticket.id}
                    ticket={ticket}
                    removeTicket={removeTicket}
                  />
                );
              } else {
                return null;
              }
            })}
          </ol>
        </>
      );
    } else {
      return <div>No Students Waiting</div>;
    }
  };

  const showCheckBoxes = () => {
    return (
      <form className="classListContainer">
        {/* {classes.map(classType => {
                  return <li key={classType}>{classType}</li>
              })} */}
        <label className={sixOne ? "checked" : "notChecked"}>
        6.1
          <input
            type="checkbox"
            checked={sixOne}
            onChange={(e) => setSixOne((prevSixOne) => !prevSixOne)}
          />
        </label>
        <label className={sixTwo? "checked" : "notChecked"}>
          6.2
          <input
            type="checkbox"
            checked={sixTwo}
            onChange={(e) => setSixTwo((prevSixTwo) => !prevSixTwo)}
          />
        </label>
        <label className={sixThree ? "checked" : "notChecked"}>
          6.3
          <input
            type="checkbox"
            checked={sixThree}
            onChange={(e) => setSixThree((prevSixThree) => !prevSixThree)}
          />
        </label>
        <label className={sixFour ? "checked" : "notChecked"}>
          6.4
          <input
            type="checkbox"
            checked={sixFour}
            onChange={(e) => setSixFour((prevSixFour) => !prevSixFour)}
          />
        </label>
      </form>
    );
  };

  return (
    <div className="adminContainer">
      <h1>Admin Only</h1>
      {showCheckBoxes()}
      {showTickets()}
    </div>
  );
}
