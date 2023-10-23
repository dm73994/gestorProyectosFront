import { RoleModel } from '../../../models/Role.model';
export type MenuModel = {
    icon: any,
    path: string,
    text: string,
    allowed: string[],
    children?: MenuModel[]; 
}