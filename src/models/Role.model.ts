import { UsersRoles } from "./UsersRoles";

export type RoleModel = {
    id: number;
    type: UsersRoles;
    state?: 'add' | 'remove'
}