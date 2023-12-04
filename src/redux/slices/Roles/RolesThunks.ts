import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRoles as fetchRoles } from '../../../services';
import { RoleModel } from '../../../models';

export const getRoles = createAsyncThunk(
  'roles/getRoles', 
  async (payload, { rejectWithValue }) => {
    try {
      const {data} = await fetchRoles();
      const formattedResponse = data.map( role => adapt(role));
      return formattedResponse;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adapt = (rol: any):RoleModel =>  {
  const formattedRol: RoleModel = {
    id: rol.codigoRol,
    type: rol.tipoRol,
    state: undefined
  }

  return formattedRol;
}