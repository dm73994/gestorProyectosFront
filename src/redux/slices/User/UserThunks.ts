// import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
// import { LoginModel } from '../../../models';
// import { useFetchAndLoad } from '../../../hooks';
// import { getUser } from '../../../services';

// // !--- INIT HANDLER ---!
// const handlerLogin: AsyncThunkPayloadCreator<any, LoginModel, {}> = async (payload, { rejectWithValue }) => {
//   const {callEndpoint} = useFetchAndLoad();
//   try {
//     const response = await callEndpoint(getUser(1002963532));
//     return response.data
//   } catch (error: any) {
//     return rejectWithValue(error.response.data);
//   }
// };



// // !--- GENERATE THUNKS ---!
// export const getLogin = createAsyncThunk('user/getLogin', handlerLogin);