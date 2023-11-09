import { UserModel } from '../models';

export const filterUserRoles = (user: UserModel): string[] => {
  if(!user) return [];
  return user.roles.map(role => role.type);
}