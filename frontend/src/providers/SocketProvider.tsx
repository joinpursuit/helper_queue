import React, { createContext, useContext } from 'react'
import socketIOClient from "socket.io-client";
import { apiURL } from '../util/apiURL';
import { AuthContext } from './AuthProvider'
import { PropsChildren } from '../interfaces/interfaces';
export const SocketContext = createContext<SocketIOClient.Socket>({} as SocketIOClient.Socket);


const SocketProvider = ({children}: PropsChildren) => {
    const API = apiURL();
    const { currentUser } = useContext(AuthContext)
    const socket = socketIOClient(API, {query: `email=${currentUser && currentUser.email}`});
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;