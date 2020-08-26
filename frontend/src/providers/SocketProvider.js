import React, { createContext } from 'react'
import socketIOClient from "socket.io-client";
import { apiURL } from '../util/apiURL';

export const SocketContext = createContext();

const SocketProvider = (props) => {
    const API = apiURL();
    const socket = socketIOClient(API);

    return(
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;