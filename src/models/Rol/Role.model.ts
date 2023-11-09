import { UsersRoles } from '../user/UsersRoles';

export type RoleModel = {
    id: number;
    type: UsersRoles;
    state?: 'add' | 'remove'
}