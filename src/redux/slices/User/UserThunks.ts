import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginModel, UserModel } from "../../../models";
import { useDispatch } from "react-redux";
import { useFetchAndLoad } from "../../../hooks";
import { UserAdapter } from "../../../adapters";
import { getUser } from "../../../services";
import { loggInUser } from "./UserSlice";

// !--- INIT HANDLER ---!
const handlerLogin: AsyncThunkPayloadCreator<any, LoginModel, {}> = async (payload, { rejectWithValue }) => {
    const {callEndpoint} = useFetchAndLoad();
    try {
        const response = await callEndpoint(getUser(1002963532));
        return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
};



// !--- GENERATE THUNKS ---!
export const getLogin = createAsyncThunk('user/getLogin', handlerLogin);