import { permissionsModel } from '..';
import { RoleModel } from '../Rol/Role.model';

export type UserModel = {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    token: string;
    state: boolean;
    roles: RoleModel[];
    email: string;
    permissions: permissionsModel;
}