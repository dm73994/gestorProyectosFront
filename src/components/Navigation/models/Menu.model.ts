import { UsersRoles } from '../../../models';

export type MenuModel = {
    icon: any,
    path: string,
    text: string,
    allowed: UsersRoles[],
    children?: MenuModel[]; 
}