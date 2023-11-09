export interface permissionsModel {
    user: userPermissions,
    role: rolePermissions,
    propuesta: propuestaPermissions,
}

export interface userPermissions  {
    edit: boolean;
    add: boolean;
    consult: boolean;
    view: boolean;
    active: boolean;
}

export interface rolePermissions {
    edit: boolean;
    add: boolean;
    consult: boolean;
    view: boolean;
}

export interface propuestaPermissions {
    add: boolean;
    consult: boolean;
    download: boolean;
    aprove: boolean;
    review: boolean;
}