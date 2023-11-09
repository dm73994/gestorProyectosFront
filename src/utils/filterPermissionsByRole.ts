import { RoleModel, UsersRoles, permissionsModel, propuestaPermissions, rolePermissions, userPermissions } from '../models';

const initialRoles: permissionsModel = {
  user: {
    edit: false,
    add: false,
    consult: false,
    view: false,
    active: false
  },
  role: {
    edit: false,
    add: false,
    consult: false,
    view: false
  },
  propuesta: {
    add: false,
    consult: false,
    download: false,
    aprove: false,
    review: false
  }
}

export const filterPermissionsByRole = (roles: RoleModel[]): permissionsModel => {

  const roleTypes = roles.map((role: RoleModel) => role.type);
  let initial = initialRoles;


  if( roleTypes.includes(UsersRoles.ADMIN) ){
    initial.user = setUserPermissions([]);
    initial.role = setRolesPermissions([]);
    initial.propuesta = setPropuestaPermissions([]);
    return initial;
  }

  if( roleTypes.includes(UsersRoles.DIRECTOR) ){ 
    initial.user = setUserPermissions(['add', 'edit', 'active']);
    initial.role = setRolesPermissions(['add', 'edit']);
    initial.propuesta = setPropuestaPermissions(['consult', 'aprove', 'review']);
  }

  if( roleTypes.includes(UsersRoles.COMITE) ){ 
    initial.user = setUserPermissions(['add', 'edit', 'active']);
    initial.role = setRolesPermissions(['add', 'edit']);
    initial.propuesta = setPropuestaPermissions(['add']);
  }

  if( roleTypes.includes(UsersRoles.JEFEDEPARTAMENTO) ){
    initial.user = setUserPermissions(['add', 'edit', 'active']);
    initial.role = setRolesPermissions(['add', 'edit']);
    initial.propuesta = setPropuestaPermissions(['add', 'review']);
  }

  if( roleTypes.includes(UsersRoles.ESTUDIANTE) ){ /* empty */ }
  if( roleTypes.includes(UsersRoles.EVALUADOR) ){ /* empty */ }

  return initial;
}

const setUserPermissions = (reject: string[]): userPermissions => {
  const initial: userPermissions = {
    edit: true,
    add: true,
    consult: true,
    view: true,
    active: true,
  };

  reject.forEach((permission: string) => {
    initial[permission] = false;
  });

  return initial;
}

const setRolesPermissions = (reject: string[]): rolePermissions => {
  const initial: rolePermissions = {
    edit: true,
    add: true,
    consult: true,
    view: true,
  };

  reject.forEach((permission: string) => {
    initial[permission] = false;
  });

  return initial;
}

const setPropuestaPermissions = (reject: string[]): propuestaPermissions => {
  const initial: propuestaPermissions = {
    add: true,
    consult: true,
    download: true,
    aprove: true,
    review: true,
  };

  reject.forEach((permission: string) => {
    initial[permission] = false;
  });

  return initial;
}