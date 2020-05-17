import React from 'react'

export default function TicketIndexItem({ticket, removeTicket}) {
    return(
        <li>
            <p> {ticket.email} </p>
            <button onClick={() => removeTicket(ticket.id)}>Complete</button>
        </li>
    )
};
