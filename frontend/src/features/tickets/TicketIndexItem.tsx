import React from "react";
import TimeAgo from "react-timeago";
import { Ticket } from '../../interfaces/interfaces';

interface TicketIndexItemProps {
    ticket: Ticket; 
    removeTicket: (ticket: Ticket) => void; 
}

export default function TicketIndexItem({ ticket, removeTicket }: TicketIndexItemProps) {
  return (
    <li className="ticketIndexItem">
      <div>
        <p> {ticket.email} </p>
        <button onClick={() => removeTicket(ticket)}>Complete</button>
        <TimeAgo date={ticket.created_at} />
      </div>
    </li>
  );
}
