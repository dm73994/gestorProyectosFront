import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '../../../models/User.model';
import { AuthInteface } from '../../../models';
import { getLogin } from '.';
import Swal from 'sweetalert2';

type Action = {
  payload: UserModel;
  action: string;
}


const initialState: AuthInteface = {
  loggedIn: false,
  user: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggInUser: (state, action ) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    loggOutUser: (state) => {
      state = initialState;
    }
  },
  extraReducers(builder) {
    // PENDING LOGIN CASE
    // builder.addCase(getLogin.pending, (state) => {
    //   state.loggedIn = 'loading';
    // });

    // LOGIN SUCCESS
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    });

    // LOGIN FAIL
    builder.addCase(getLogin.rejected, (state, action) => {
      state = initialState;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: `<a href="">${action.error.message}</a>`
      })
    });
  },
})

// Action creators are generated for each case reducer function
export const { loggInUser, loggOutUser } = UserSlice.actions

export default UserSlice.reducer