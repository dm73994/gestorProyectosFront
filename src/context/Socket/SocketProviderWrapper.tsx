import React, { useEffect, useReducer } from 'react'
import { SocketActionsReducer, SocketReducer, defaultSocketContext } from './SocketReducer'
import SocketContext from './SocketContext'
import { useSocket } from '../../hooks/useSocket'

export const SocketProviderWrapper = ({children}) => {
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContext)
  const socket = useSocket('http://localhost:5000/ws', {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
    transports: ['websocket'],
  });

  useEffect(() => {
    /** CONNECT TO THE WEB SOCKET */
    socket.connect();
    socket.emit('subscribe', '/topic/greetings')

    /** SAVE THE SOCKET IN THE CONTEXT */
    SocketDispatch({ type: SocketActionsReducer.UPDATE, payload: socket })

    /** START THE EVENT LISTENERS */
    startListeners();

    /** SEND HANDSHAKE */
    sendHandshake();
  }, [])

  const startListeners = () => {
    /** Reconnect event */
    socket.io.on('reconnect', (attempt) => {
      console.log('Reconnect on attemp', attempt)
    });

    /** Reconnect attempt event */
    socket.io.on('reconnect_attempt', (attempt) => {
      console.log('Reconnection attempt', attempt)
    })

    /** Reconection error */
    socket.io.on('reconnect_error', (error) => {
      console.log('Reconnection error', error)
    })

    /** Reconection faild */
    socket.io.on('reconnect_failed', () => {
      // console.log('Reconnection failed')
      alert('Reconnection failed')
    })
  }

  const sendHandshake = () => {
    console.log('Sending handshake to the server ...')
    socket.emit('/app/hello', (uid: string, users: string[]) => {
      console.log('Handshake sent')
      SocketDispatch({ type: SocketActionsReducer.UPDATEUID, payload: uid })
      SocketDispatch({ type: SocketActionsReducer.UPDATEUSERS, payload: users })
    });
  }

  return (
    <SocketContext.Provider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContext.Provider>
  )
}
