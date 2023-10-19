import { UserModel } from "../models"

export const UserAdapter = (superUser: any): UserModel => {

    const formattedUser: UserModel = {
        id: superUser.identificacionUsuario,
        name: superUser.nombresUsuario,
        lastname: superUser.apellidosUsuario,
        username: superUser.loginUsuario.userNameLogin,
        password: superUser.loginUsuario.contraseñaLogin,
        token: '',
        state: superUser.estadoUsuario === 1 ? true : false,
        roles: superUser.roles.map((rol: any) => {
            return {
                id: rol.codigoRol,
                type: rol.tipoRol
            }
        }),
        email: superUser.emailUsuario,
        permissions: {
            editUser: false,
            editRole: false,
            deleteUser: false,
            deleteRole: false,
            createUser: false,
            createRole: false,
            viewUser: false,
            viewRole: false,
            viewUsers: false,
            viewRoles: false,
            viewPermissions: false,
            activeUser: false
        }
    }
    
    return formattedUser
}