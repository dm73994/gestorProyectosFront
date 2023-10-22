import { RoleModel, UserModel, permissionsModel } from "../models"

export const UserAdapter = (superUser: any): UserModel => {

    const roles: RoleModel[] = superUser.roles.map((rol: any) => {
        return {
            id: rol.codigoRol,
            type: rol.tipoRol
        }
    });

    const permissions: permissionsModel = {
        editUser: true,
        editRole: true,
        deleteUser: true,
        deleteRole: true,
        createUser: true,
        createRole: true,
        viewUser: true,
        viewRole: true,
        viewUsers: true,
        viewRoles: true,
        viewPermissions: true,
        activeUser: true
    }

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