import { filterUserRoles } from '.';
import { UserModel } from '../models';

export const filterUserAuthorizationByRoles = (userRoles: UserModel, authorization: string[]): boolean => {   
  const roles = filterUserRoles(userRoles); 
  let allow = false;
  /*
    *   The following code verifies that the user has the roles to see the component
    *   based on the roles that the user has.
    *   If the user has at least one of the roles, the component is displayed.
    */
  authorization.forEach((auth) => {
    if( roles.includes(auth) ){
      allow = true;
    }
  })
  
  return allow;
}   