export const filterUserAuthorizationByRoles = (userRoles: string[], authorization: string[]): boolean => {    
    /*
    *   The following code verifies that the user has the roles to see the component
    *   based on the roles that the user has.
    *   If the user has at least one of the roles, the component is displayed.
    */
    const areAllowedRolesValid = authorization.every((role) => userRoles.includes(role));
    return areAllowedRolesValid;
}   