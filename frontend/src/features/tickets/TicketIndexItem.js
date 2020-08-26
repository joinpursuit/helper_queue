import React from 'react'
import TimeAgo from 'react-timeago';

 export default function TicketIndexItem({ticket, removeTicket}) {

    return(
        <li className="ticketIndexItem">
        <div>
            <p> {ticket.email} </p>
            <button onClick={() => removeTicket(ticket.id)}>Complete</button>
            <TimeAgo date={ticket.created_at} />
        </div>
            
        </li>
    )
};
