export interface permissionsModel {
    user: userPermissions,
    role: rolePermissions,
    propuesta: propuestaPermissions,
    anteproyecto: anteproyectoPermissions,
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
    viewAll: boolean;
    viewOwner: boolean;
    download: boolean;
    aprove: boolean;
    review: boolean;
}

export interface anteproyectoPermissions {
    addAnteproyecto: boolean;
    addVersion: boolean;
    addReview: boolean;
    addEvaluator: boolean;
    
    download: boolean;
    
    viewReviews: boolean;
    viewAll: boolean;
    viewOwner: boolean;
    viewEvaluator: boolean;
    viewAccepted: boolean;

    aprove: boolean;
    reject: boolean;

}