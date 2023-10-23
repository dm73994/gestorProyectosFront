import { RoleModel, UsersRoles, permissionsModel } from "../models";

export const filterPermissionsByRole = (roles: RoleModel[]): permissionsModel => {

    const roleTypes = roles.map((role: RoleModel) => role.type);

    const defaultRoles: permissionsModel = {
        editUser: false,
        editRole: false,
        addUser: false,
        addRole: false,
        consultUser: false,
        consultRole: false,
        consultDocument: false,
        viewUsers: false,
        viewRoles: false,
        viewPermissions: false,
        activeUser: false
    }

    if( roleTypes.includes(UsersRoles.ADMIN) ){
        defaultRoles.editUser = true;
        defaultRoles.editRole = true;
        defaultRoles.addUser = true;
        defaultRoles.addRole = true;
        defaultRoles.consultUser = true;
        defaultRoles.consultRole = true;
        defaultRoles.consultDocument = true;
        defaultRoles.viewUsers = true;
        defaultRoles.viewRoles = true;
        defaultRoles.viewPermissions = true;
        defaultRoles.activeUser = true;
        return defaultRoles;
    }
    if( roleTypes.includes(UsersRoles.DIRECTOR) ){
        
    }
    if( roleTypes.includes(UsersRoles.COMITE) ){

    }
    if( roleTypes.includes(UsersRoles.JEFEDEPARTAMENTO) ){

    }
    if( roleTypes.includes(UsersRoles.ESTUDIANTE) ){

    }
    if( roleTypes.includes(UsersRoles.EVALUADOR) ){

    }

    return defaultRoles;
}