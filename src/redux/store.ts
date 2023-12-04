import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/User/UserSlice'
import { RolesSlice, store } from '.';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export interface AppStore {
  user: any;
  roles: any;
}
export interface PersistenUserStore {
  user: any;
}
export interface PersistenRolesStore {
  roles: any;
}

const persistUserConfig: PersistConfig<PersistenUserStore> = {
  key: 'unicaucaUser',
  storage,
}

const persistRolesConfig: PersistConfig<PersistenRolesStore> = {
  key: 'unicaucaRoles',
  storage,
}

const persistedUserReducer = persistReducer(persistUserConfig, UserSlice);
const persistedRolesReducer = persistReducer(persistRolesConfig, RolesSlice);

export default configureStore<AppStore>({
  reducer: {
    user: persistedUserReducer,
    roles: persistedRolesReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
