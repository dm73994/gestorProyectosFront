import { MenuModel } from '../components';
import { UserModel } from '../models';

export const filterMenuByRole = (user: UserModel, menu: MenuModel[]): MenuModel[] => {
  // obtaines the roles of the user in an array of strings 
  // to be able to compare them with the roles of the menu options
  const userRoles = user.roles.map(role => role.type); 

  /*
    *   The following code filters the menu options that the user can see
    *   based on the roles that the user has.
    */
  const areAllowedRolesValid = menu.filter((option) => {
    return option.allowed.every((role) => {
      return userRoles.includes(role)
    })
  }
  );


  return areAllowedRolesValid;
}