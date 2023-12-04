import { createContext } from 'react';
import { ISocketContext, SocketContextActions, defaultSocketContext } from './SocketReducer';

export interface ISocketContextProps {
    SocketState: ISocketContext;
    SocketDispatch: React.Dispatch<SocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContext,
  SocketDispatch: () => {}
});

export const SocketProvider = SocketContext.Provider;
export const SocketConsumer = SocketContext.Consumer;


export default SocketContext;