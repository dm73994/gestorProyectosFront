import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/User/UserSlice'
import { store } from '.';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export interface AppStore {
  user: any;
}

const persistConfig: PersistConfig<AppStore> = {
  key: 'unicaucaUser',
  storage,
}
const persistedReducer = persistReducer(persistConfig, UserSlice);

export default configureStore<AppStore>({
  reducer: {
    user: persistedReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
