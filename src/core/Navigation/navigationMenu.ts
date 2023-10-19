import { MenuModel } from '../../components/Navigation';
import { RoleModel } from '../../models/Role.model';
import { HomeOutlined } from '@mui/icons-material';
export const navigationMenu = () => {

    const menu: MenuModel[] = [
        {
            icon: HomeOutlined,
            path: '/home',
            text: 'Inicio',
            allowed: [ ]
        },
        {
            icon: HomeOutlined,
            path: '/users/create',
            text: 'Inicio',
            allowed: [ 'administrado' ]
        },
        {
            icon: HomeOutlined,
            path: '/users',
            text: 'Inicio',
            allowed: [ 'administrado' ]
        },
        {
            icon: HomeOutlined,
            path: '/roles',
            text: 'Inicio',
            allowed: [ 'administrado' ]
        },
        {
            icon: HomeOutlined,
            path: '/roles/create',
            text: 'Inicio',
            allowed: [ 'administrado' ]
        },
    ]

    return menu;
}