import { useEffect, useRef } from 'react'
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client'

export const useSocket = (
  uri: string, 
  opts?: Partial<ManagerOptions & SocketOptions>
): Socket => {
  const {current: socket} = useRef(io('http://localhost:5000/ws', opts))

  useEffect(() => {
    return () => {
      if(socket) socket.close();
            
    }
  }, []);

  return socket;
}