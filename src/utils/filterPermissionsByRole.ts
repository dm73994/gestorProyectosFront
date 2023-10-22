import { RoleModel, permissionsModel } from "../models";

export const filterPermissionsByRole = (roles: RoleModel[]): permissionsModel => {

    ['Administrador', 'sercretario']

    return {
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