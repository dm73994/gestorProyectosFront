/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io-client';

export interface ISocketContext {
    socket: Socket | undefined;
    uid: string;
    users: string[]
}

export const defaultSocketContext: ISocketContext = {
  socket: null,
  uid: '',
  users: []
}

export enum SocketActionsReducer {
  UPDATE = 'update_socket',
  UPDATEUID = 'update_uid',
  UPDATEUSERS = 'update_users',
  REMOVEUSER = 'remove_user',
}

export type SocketContextPayload = string | string[] | Socket;

export interface SocketContextActions {
    type: SocketActionsReducer;
    payload: SocketContextPayload;
}

export const SocketReducer = (state: ISocketContext, action: SocketContextActions) => {
  switch(action.type) {

  case SocketActionsReducer.UPDATE: 
    return {
      ...state,
      socket: action.payload as Socket
    }
  case SocketActionsReducer.UPDATEUID: 
    return {
      ...state,
      uid: action.payload as string
    }
  
  case SocketActionsReducer.UPDATEUSERS: 
    return {
      ...state,
      users: action.payload as string[]
    }
  
  case SocketActionsReducer.REMOVEUSER:
    return {
      ...state,
      users: state.users.filter((uid) => uid !== action.payload as string)
    }

  default: 
    return {...state}
  }

}