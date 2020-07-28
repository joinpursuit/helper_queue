import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
import { AuthContext } from "../providers/AuthProvider";
import socketIOClient from "socket.io-client";
import "../css/RequestHelp.css";

export default function RequestHelp() {
    const [isWaitingForHelp, setIsWaitingForHelp] = useState(false);
    const [openTicket, setOpenTicket] = useState(null)
    const { token, currentUser } = useContext(AuthContext);
    const API = apiURL();
    const socket = socketIOClient(API);
    const fetchOpenTicket = async () => {
        try {
            let res = await axios({
                method: 'get', 
                url: `${API}/api/tickets/open_tickets/`,
                headers: {
                    'AuthToken': token
                }
            })
            if(res.data.openTicket.length) {
                setIsWaitingForHelp(true);
                setOpenTicket(res.data.openTicket[0])
            } else {
                setIsWaitingForHelp(false);
                setOpenTicket(null)
            }    
        } catch (error) {
            setIsWaitingForHelp(false);
            setOpenTicket(null)
        }
        
    }
    useEffect(() => {
        fetchOpenTicket()
    }, [])
    
    useEffect(() => {
        socket.on("ticketClose", fetchOpenTicket)
        return () => socket.off("ticketClose", fetchOpenTicket)
    }, [])

    const makeRequest = async () => {
        try {
            let res = await axios({
                method: 'post', 
                url: `${API}/api/tickets`,
                headers: {
                    'AuthToken': token
                },
                data: {
                    body: ""
                }
            })
            socket.emit("openTicket", currentUser )
            fetchOpenTicket()
        } catch (error) {
            fetchOpenTicket()
        }
        
    }
    
    const cancelRequest = async () => {
        try {
            let res = await axios({
                method: 'delete', 
                url: `${API}/api/tickets/close_tickets/${openTicket.id}`,
                headers: {
                    'AuthToken': token
                }
            })
            socket.emit("closeTicket", "remove ticket" )
            fetchOpenTicket()
        } catch (error) {
            fetchOpenTicket()
        }

    }

    return(
        <div className="requestContainer">
            {isWaitingForHelp ? 
            <button onClick={cancelRequest} className="cancelRequest request">Cancel Request</button> 
            :
            <button onClick={makeRequest} className="makeRequest request">Request Help</button>
            }
        </div>
    )
};
