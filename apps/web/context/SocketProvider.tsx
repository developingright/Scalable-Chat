'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage : (message: string) => any;
    messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const context = React.useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
     
export const SocketProvider: React.FC<SocketProviderProps> = ({children}) =>{
    const [socket,setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const sendMessage: ISocketContext['sendMessage'] = useCallback((message) => {
        console.log('Sending message: ', message);
        if(socket){
            socket.emit('event:message', { message });
        }
    }, [socket]); 

    const onMessageRec = useCallback((msg:  { message: string } ) => {
        console.log('From server Message Rec: ', msg);
        const { message } = msg;  
        setMessages((prevMessages) => [...prevMessages, message]);
    },[]);
    useEffect(() => {
        const _socket = io('http://localhost:8080');
        _socket.on('message', onMessageRec);
        setSocket(_socket);
        return () => {
            _socket.disconnect();
            _socket.off('message', onMessageRec);
            setSocket(null);
        }    
    }
    , []);
    return (
        <SocketContext.Provider value={{ sendMessage ,messages}}>
            {children}
        </SocketContext.Provider>
    )
}