import { UsersRoles, anteproyectoPermissions, permissionsModel, propuestaPermissions, rolePermissions, userPermissions } from '../models';

const initialRoles: permissionsModel = {
  user: {
    edit: true,
    add: true,
    consult: true,
    view: true,
    active: true,
  },
  role: {
    edit: true,
    add: true,
    consult: true,
    view: true
  },
  propuesta: {
    add: true,
    viewAll: true,
    viewOwner: true,
    download: true,
    aprove: true,
    review: true,
  },
  anteproyecto: {
    addAnteproyecto: true,
    addVersion: true,
    addReview: true,
    addEvaluator: true,    
    download: true,    
    viewReviews: true,
    viewAll: true,
    viewOwner: true,
    viewEvaluator: true,    
    aprove: true,
    reject: true,
    viewAccepted: true,
  }
}

export const filterPermissionsByRole = (roles: string[]): permissionsModel => {

  const permissions = initialRoles;

  if( roles.includes(UsersRoles.ADMIN) ){
    permissions.user = removeUserPermissions([], permissions.user);
    permissions.role = removeRolesPermissions([], permissions.role);
    permissions.propuesta = removePropuestaPermissions([], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions([], permissions.anteproyecto);
    return permissions;
  }

  if( roles.includes(UsersRoles.DIRECTOR) ){ 
    permissions.user = removeUserPermissions(['add', 'edit', 'active'], permissions.user);
    permissions.role = removeRolesPermissions(['add', 'edit', 'consult', 'view'], permissions.role);
    permissions.propuesta = removePropuestaPermissions(['aprove', 'review', 'viewAll'], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions(['addReview', 'addEvaluator', 'viewAll', 'viewEvaluator', 'aprove', 'reject', 'viewAccepted'], permissions.anteproyecto);
  }

  if( roles.includes(UsersRoles.COMITE) ){ 
    permissions.user = removeUserPermissions(['add', 'edit', 'active'], permissions.user);
    permissions.role = removeRolesPermissions(['add', 'edit'], permissions.role);
    permissions.propuesta = removePropuestaPermissions(['add', 'aprove'], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions(['addAnteproyecto', 'addVersion', 'addReview', 'addEvaluator', 'viewAll', 'viewOwner', 'viewEvaluator', 'aprove', 'reject' ], permissions.anteproyecto);
  }

  if( roles.includes(UsersRoles.JEFEDEPARTAMENTO) ){
    permissions.user = removeUserPermissions(['add', 'edit', 'active'], permissions.user);
    permissions.role = removeRolesPermissions(['add', 'edit'], permissions.role);
    permissions.propuesta = removePropuestaPermissions(['add', 'review'], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions(['addAnteproyecto', 'addVersion', 'addReview', 'viewOwner', 'viewEvaluator', 'aprove', 'reject' ], permissions.anteproyecto);
  }

  if( roles.includes(UsersRoles.COORDINADOR) ){
    permissions.user = removeUserPermissions(['add', 'edit', 'active'], permissions.user);
    permissions.role = removeRolesPermissions(['add', 'edit'], permissions.role);
    permissions.propuesta = removePropuestaPermissions(['add'], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions(['addAnteproyecto', 'addEvaluator', 'addVersion', 'addReview', 'viewOwner', 'viewEvaluator' ], permissions.anteproyecto);
  }

  if( roles.includes(UsersRoles.ASESOR) ){/* empty */}
  if( roles.includes(UsersRoles.ESTUDIANTE) ){ /* empty */ }

  if( roles.includes(UsersRoles.EVALUADOR) ){
    permissions.user = removeUserPermissions(['add', 'edit', 'active', 'consult', 'view'], permissions.user);
    permissions.role = removeRolesPermissions(['add', 'edit', 'consult', 'view'], permissions.role);
    permissions.propuesta = removePropuestaPermissions(['add', 'review', 'viewAll', 'viewOwner', 'download', 'aprove'], permissions.propuesta);
    permissions.anteproyecto = removeAnteproyectoPermissions(['addAnteproyecto', 'addVersion', 'addEvaluator', 'viewAll', 'viewOwner', 'viewAccepted', ], permissions.anteproyecto);
  }

  return permissions;
}

const removeUserPermissions = (reject: string[], previousPermissions: userPermissions): userPermissions => {

  reject.forEach((permission: string) => {
    previousPermissions[permission] = false;
  });

  return previousPermissions;
}

const removeRolesPermissions = (reject: string[], previousPermissions: rolePermissions): rolePermissions => {

  reject.forEach((permission: string) => {
    previousPermissions[permission] = false;
  });

  return previousPermissions;
}

const removePropuestaPermissions = (reject: string[], previousPermissions: propuestaPermissions): propuestaPermissions => {

  reject.forEach((permission: string) => {
    previousPermissions[permission] = false;
  });

  return previousPermissions;
}

const removeAnteproyectoPermissions = (reject: string[], previousPermissions: anteproyectoPermissions): anteproyectoPermissions => {

  reject.forEach((permission: string) => {
    previousPermissions[permission] = false;
  });

  return previousPermissions;
}