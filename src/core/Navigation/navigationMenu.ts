import { MenuModel } from '../../components/Navigation';
import { UsersRoles } from '../../models';
import { Home, AdminPanelSettings, Group, AddchartSharp, SubjectSharp, PlaylistAddCheckSharp, PlaylistAddSharp} from '@mui/icons-material';

export const navigationMenu = () => {

    const menu: MenuModel[] = [
        {
            icon: Home,
            path: '/home',
            text: 'Inicio',
            allowed: [ UsersRoles.ADMIN ]
        },
        {
            icon: Group,
            path: '/users',
            text: 'Usuarios',
            allowed: [ UsersRoles.ADMIN ]
        },
        {
            icon: AdminPanelSettings,
            path: '/roles',
            text: 'Roles',
            allowed: [ UsersRoles.ADMIN ]
        },
        {
            icon: AddchartSharp,
            path: '/propuestas',
            text: 'Propuestas de grado',
            allowed: [ UsersRoles.DIRECTOR ],
            children: [
                {
                    icon: PlaylistAddSharp,
                    path: '/consult',
                    text: 'Registrar Anteproyecto',
                    allowed: [ UsersRoles.DIRECTOR ]
                },
                {
                    icon: SubjectSharp,
                    path: '/register',
                    text: 'Consultar Anteproyectos',
                    allowed: [ UsersRoles.DIRECTOR ]
                },
            ]
        },
        {
            icon: AdminPanelSettings,
            path: '/anteproyecto',
            text: 'Anteproyecto',
            allowed: [ UsersRoles.DIRECTOR ],
            children: [
                {
                    icon: AdminPanelSettings,
                    path: '/register',
                    text: 'Registrar Anteproyecto',
                    allowed: [ UsersRoles.DIRECTOR ]
                },
                {
                    icon: AdminPanelSettings,
                    path: '/consult',
                    text: 'Consultar Anteproyectos',
                    allowed: [ UsersRoles.DIRECTOR ]
                },
            ]
        },
        {
            icon: AdminPanelSettings,
            path: '/trabajoGrado',
            text: 'Trabajo de grado',
            allowed: [ UsersRoles.ADMIN ],
            children: [
                {
                    icon: AdminPanelSettings,
                    path: '/extensionRequest',
                    text: 'Solicitar Prorroga',
                    allowed: [ UsersRoles.ADMIN ]
                },
                {
                    icon: AdminPanelSettings,
                    path: '/edit',
                    text: 'Modificar',
                    allowed: [ UsersRoles.ADMIN ]
                },
                {
                    icon: AdminPanelSettings,
                    path: '/cancel',
                    text: 'Cancelar',
                    allowed: [ UsersRoles.ADMIN ]
                },
                {
                    icon: AdminPanelSettings,
                    path: '/suspent',
                    text: 'Cancelar',
                    allowed: [ UsersRoles.ADMIN ]
                },
            ]
        },
        
    ]

    return menu;
}