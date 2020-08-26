import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from '../../providers/SocketProvider';
import {
  selectTickets,
  fetchOpenTickets,
  destroyTicket,
} from "./ticketsSlice";
import TicketIndexItem from "./TicketIndexItem";
import alertSound from "../../assets/that-was-quick.mp3";
import "./TicketIndex.css";

export default function TicketIndex() {
  let initialFour = window.localStorage.getItem("sixFour");
  let initialThree = window.localStorage.getItem("sixThree");
  let initialTwo = window.localStorage.getItem("sixTwo");
  let initialOne = window.localStorage.getItem("sixOne");

  const [sixFour, setSixFour] = useState(
    initialFour === "true" || initialFour === null
  );
  const [sixThree, setSixThree] = useState(
    initialThree === "true" || initialThree === null
  );
  const [sixTwo, setSixTwo] = useState(
    initialTwo === "true" || initialTwo === null
  );
  const [sixOne, setSixOne] = useState(
    initialOne === "true" || initialOne === null
  );

  useEffect(() => {
    window.localStorage.setItem("sixFour", sixFour);
    window.localStorage.setItem("sixThree", sixThree);
    window.localStorage.setItem("sixTwo", sixTwo);
    window.localStorage.setItem("sixOne", sixOne);
    return () => {
      window.localStorage.setItem("sixFour", sixFour);
      window.localStorage.setItem("sixThree", sixThree);
      window.localStorage.setItem("sixTwo", sixTwo);
      window.localStorage.setItem("sixOne", sixOne);
    };
  }, [sixOne, sixTwo, sixThree, sixFour]);

  const legend = {
    "6.4": sixFour,
    "6.3": sixThree,
    "6.2": sixTwo,
    "6.1": sixOne,
  };

  const socket = useContext(SocketContext);
  const tickets = useSelector(selectTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpenTickets());
    socket.on("updateTickets", fetchTickets);
    return () => socket.off("updateTickets", fetchTickets);
  }, []);

  useEffect(() => {
    socket.on("ticketClose", fetchTickets);
    return () => socket.off("ticketClose", fetchTickets);
  });

  useEffect(() => {
    const playSound = (data) => {
      if (legend[data.class]) {
        let src = alertSound;
        let audio = new Audio(src);
        audio.play();
      }
    };
    socket.on("newTicket", playSound);
    return () => socket.off("newTicket", playSound);
  }, [sixOne, sixTwo, sixThree, sixFour]);

  const removeTicket = async (id) => {
    await dispatch(destroyTicket(id));
    socket.emit("ticketClosed");
  };

  const fetchTickets = () => {
    dispatch(fetchOpenTickets())
  }

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
        <label className={sixOne ? "checked" : "notChecked"}>
          6.1
          <input
            type="checkbox"
            checked={sixOne}
            onChange={(e) => setSixOne((prevSixOne) => !prevSixOne)}
          />
        </label>
        <label className={sixTwo ? "checked" : "notChecked"}>
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
