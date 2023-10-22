import { MenuModel } from '../../components/Navigation';
import { RoleModel } from '../../models/Role.model';
import { Home, AdminPanelSettings, Group} from '@mui/icons-material';

export const navigationMenu = () => {

    const menu: MenuModel[] = [
        {
            icon: Home,
            path: '/home',
            text: 'Inicio',
            allowed: [ 'Administrador' ]
        },
        {
            icon: Group,
            path: '/users',
            text: 'Usuarios',
            allowed: [ 'Administrador' ]
        },
        {
            icon: AdminPanelSettings,
            path: '/roles',
            text: 'Roles',
            allowed: [ 'Administrador' ]
        },
    ]

    return menu;
}