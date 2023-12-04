import { createSlice } from '@reduxjs/toolkit'
import { RoleModel } from '../../../models';
import Swal from 'sweetalert2';
import { getRoles } from './RolesThunks';


const initialState: {roles: RoleModel[]} = {
  roles: []
}

export const RolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    // LOGIN SUCCESS
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });

    // LOGIN FAIL
    builder.addCase(getRoles.rejected, (state, action) => {
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

export default RolesSlice.reducer