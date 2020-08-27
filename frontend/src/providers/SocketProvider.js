import React, { createContext, useContext } from 'react'
import socketIOClient from "socket.io-client";
import { apiURL } from '../util/apiURL';
import { AuthContext } from './AuthProvider'
export const SocketContext = createContext();

const SocketProvider = (props) => {
    const API = apiURL();
    const { currentUser } = useContext(AuthContext)
    const socket = socketIOClient(API, {query: `email=${currentUser.email}`});
    // console.log(socket)
    // console.log("SOCKET ID: ", socket.id)
    return(
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;