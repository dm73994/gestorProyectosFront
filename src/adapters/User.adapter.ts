import { UserModel } from "../models"

export const UserAdapter = (superUser: any): UserModel => (
    {
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
                tipo: rol.tipoRol
            }
        })
    }
)