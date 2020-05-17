import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { apiURL } from '../../util/apiURL'
import { AuthContext } from '../../providers/AuthProvider';
import TicketIndexItem from './TicketIndexItem';
import '../../css/TicketIndex.css';

export default function TicketIndex() {
    const [tickets, setTickets] = useState([])
    const API = apiURL();
    const { token } = useContext(AuthContext);
    const socket = socketIOClient(API);
    const fetchOpenTickets = async () => {
        try {
            let res = await axios({
                method: "get", 
                url: `${API}/api/tickets`,
                headers: {
                    'AuthToken': token
                }
            })
            setTickets(res.data.tickets);
        } catch (err) {
           console.log(err);
           setTickets([]);
        }

    }

    useEffect(() => {
        fetchOpenTickets();
        socket.on("updateTickets", fetchOpenTickets)
        return () => socket.off("updateTickets", fetchOpenTickets)
    }, [])

    const removeTicket = async (id) => {
        try {
            let res = await axios({
                method: 'delete', 
                url: `${API}/api/tickets/close_tickets/${id}`,
                headers: {
                    'AuthToken': token
                }
            })
            socket.emit("ticketClosed")
            fetchOpenTickets()
        } catch (error) {
            fetchOpenTickets()
        }
    }
    return(
        <div className="adminContainer">
            <h1>Admin Only</h1>
            <ol>
                {tickets.map(ticket => 
                 <TicketIndexItem key={ticket.id} ticket={ticket} removeTicket={removeTicket} />
                )}
            </ol>
        </div>
    )
};
