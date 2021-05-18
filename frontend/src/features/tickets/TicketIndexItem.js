import React from 'react'
import TimeAgo from 'react-timeago';

 export default function TicketIndexItem({ticket, removeTicket}) {
     
    return(
        <tr className="ticketIndexItem">
            <td> {ticket.email} </td>
            <td> {ticket.body} </td>
            <td><button onClick={() => removeTicket(ticket)}>Complete</button></td>
            <td><TimeAgo date={ticket.created_at} /></td>
        </tr>
    )
};
