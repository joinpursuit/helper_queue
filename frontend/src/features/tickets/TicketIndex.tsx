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
import { User, Ticket } from '../../interfaces/interfaces';
import alertSound from "../../assets/that-was-quick.mp3";
import "./TicketIndex.css";


interface Legend {
  [key: string]: boolean;
}

export default function TicketIndex() {
  let initialFour = window.localStorage.getItem("sixFour");
  let initialThree = window.localStorage.getItem("sixThree");
  let initialTwo = window.localStorage.getItem("sixTwo");
  let initialOne = window.localStorage.getItem("sixOne");

  let initialSevenOne = window.localStorage.getItem("sevenOne");
  let initialSevenTwo = window.localStorage.getItem("sevenTwo");

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
  const [sevenOne, setSevenOne] = useState(
    initialSevenOne === "true" || initialSevenOne === null
  );
  const [sevenTwo, setSevenTwo] = useState(
    initialSevenTwo === "true" || initialSevenTwo === null
  );

  useEffect(() => {
    window.localStorage.setItem("sixFour", sixFour.toString());
    window.localStorage.setItem("sixThree", sixThree.toString());
    window.localStorage.setItem("sixTwo", sixTwo.toString());
    window.localStorage.setItem("sixOne", sixOne.toString());
    window.localStorage.setItem("sevenOne", sevenOne.toString());
    window.localStorage.setItem("sevenTwo", sevenTwo.toString());
    return () => {
      window.localStorage.setItem("sixFour", sixFour.toString());
      window.localStorage.setItem("sixThree", sixThree.toString());
      window.localStorage.setItem("sixTwo", sixTwo.toString());
      window.localStorage.setItem("sixOne", sixOne.toString());
      window.localStorage.setItem("sevenOne", sevenOne.toString());
      window.localStorage.setItem("sevenTwo", sevenTwo.toString());
    };
  }, [sixOne, sixTwo, sixThree, sixFour, sevenOne, sevenTwo]);

  const legend: Legend = {
    "7.2": sevenTwo,
    "7.1": sevenOne,
    "6.4": sixFour,
    "6.3": sixThree,
    "6.2": sixTwo,
    "6.1": sixOne,
  };

  const socket = useContext(SocketContext);
  const network = useContext(NetworkContext);
  const tickets: Ticket[] = useSelector(selectTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpenTickets());
  }, [network]);

  useEffect(() => {
    const cancelRequest = (user: User) => {
      dispatch(removeTicket(user.email));
    };
    socket.on("cancelRequest", cancelRequest);
    return () => {
      socket.off("cancelRequest", cancelRequest);
    };
  });
  useEffect(() => {
    const updateTickets = (email: string) => {
      dispatch(removeTicket(email));
    };
    socket.on("updateTickets", updateTickets);
    return () => {
      socket.off("updateTickets", updateTickets);
    }
  });

  useEffect(() => {
    const playSound = (ticket: Ticket) => {
      if (legend[ticket.class]) {
        let src = alertSound;
        let audio = new Audio(src);
        audio.play();
      }
      ticket.created_at = Date.now();
      dispatch(receiveTicket(ticket));
    };
    socket.on("newTicket", playSound);
    return () => {
       socket.off("newTicket", playSound);
    }
  }, [sixOne, sixTwo, sixThree, sixFour]);

  const adminRemoveTicket = async (ticket: Ticket) => {
    await dispatch(destroyTicket(ticket));
    socket.emit("adminRemoveTicket", ticket);
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
                    removeTicket={adminRemoveTicket}
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
            onChange={() => setSixOne((prevSixOne) => !prevSixOne)}
          />
        </label>
        <label className={sixTwo ? "checked" : "notChecked"}>
          6.2
          <input
            type="checkbox"
            checked={sixTwo}
            onChange={() => setSixTwo((prevSixTwo) => !prevSixTwo)}
          />
        </label>
        <label className={sixThree ? "checked" : "notChecked"}>
          6.3
          <input
            type="checkbox"
            checked={sixThree}
            onChange={() => setSixThree((prevSixThree) => !prevSixThree)}
          />
        </label>
        <label className={sixFour ? "checked" : "notChecked"}>
          6.4
          <input
            type="checkbox"
            checked={sixFour}
            onChange={() => setSixFour((prevSixFour) => !prevSixFour)}
          />
        </label>
        <label className={sevenOne ? "checked" : "notChecked"}>
          7.1
          <input
            type="checkbox"
            checked={sevenOne}
            onChange={() => setSevenOne((prevSevenOne) => !prevSevenOne)}
          />
        </label>
        <label className={sevenTwo ? "checked" : "notChecked"}>
          7.2
          <input
            type="checkbox"
            checked={sevenTwo}
            onChange={() => setSevenTwo((prevSevenTwo) => !prevSevenTwo)}
          />
        </label>
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
