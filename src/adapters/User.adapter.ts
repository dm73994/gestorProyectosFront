import { RoleModel, UserModel, permissionsModel } from '../models'
import { filterPermissionsByRole } from '../utils';

export const UserAdapter = (superUser: any): UserModel => {

  if(superUser === null) return null; 

  const roles: RoleModel[] = superUser.roles.map((rol: any) => {
    return {
      id: rol.codigoRol,
      type: rol.tipoRol
    }
  });

  const permissions: permissionsModel = filterPermissionsByRole(roles);

  const formattedUser: UserModel = {
    id: superUser.identificacionUsuario,
    name: superUser.nombresUsuario,
    lastname: superUser.apellidosUsuario,
    username: superUser.loginUsuario.userNameLogin,
    password: superUser.loginUsuario.contraseñaLogin,
    token: '',
    state: superUser.estadoUsuario === 1 ? true : false,
    email: superUser.emailUsuario,
    roles,
    permissions
  }
    
  return formattedUser
}