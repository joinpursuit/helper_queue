import React from 'react'

export default function TicketIndexItem({ticket, removeTicket}) {
    return(
        <li className="ticketIndexItem">
            <p> {ticket.email} </p>
            <button onClick={() => removeTicket(ticket.id)}>Complete</button>
        </li>
    )
};
