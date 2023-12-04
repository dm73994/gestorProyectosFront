import { RoleModel } from '../models';

export const RoleAdapter = (rol: any):RoleModel =>  {
  const formattedRol: RoleModel = {
    id: rol.codigoRol,
    type: rol.tipoRol,
    state: undefined
  }

  return formattedRol;
}