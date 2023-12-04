import { MenuModel } from '../components';
import { UserModel } from '../models';

export const filterMenuByRole = (user: UserModel, menu: MenuModel[]): MenuModel[] => {
  // obtaines the roles of the user in an array of strings 
  // to be able to compare them with the roles of the menu options
  const userRoles = user.roles.map(role => role.type); 
  
  // obtains the roles of the menu options in an array of strings
  
  const allowedMenu: MenuModel[] = [];
  
  menu.forEach((option) => {
    const options = option.allowed.map(role => role);

    /**
     * The following code obtains the intersection of the two arrays
     * to be able to compare the roles of the user with the roles of the menu options
     */
    const intersection = new Set([...userRoles].filter(x => options.includes(x)));

    if(intersection.size !== 0) allowedMenu.push(option);    
  });


  return allowedMenu;
}