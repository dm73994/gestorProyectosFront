import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/User/UserSlice'
import { store } from '.';
import { useDispatch } from 'react-redux';

export interface AppStore {
  user: any;
}

export default configureStore<AppStore>({
  reducer: {
    user: UserSlice
  }
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
