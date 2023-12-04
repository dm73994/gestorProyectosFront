
import { MenuModel } from '../../components/Navigation';
import { UsersRoles } from '../../models';
import { Home, AdminPanelSettings, Group, AddchartSharp, SubjectSharp, PlaylistAddSharp, FormatColorText, Description, UploadFile} from '@mui/icons-material';

export const navigationMenu = () => {

  const menu: MenuModel[] = [
    {
      icon: Home,
      path: '/home',
      text: 'Inicio',
      allowed: [ UsersRoles.ADMIN, UsersRoles.ASESOR, UsersRoles.ASISTENTEJEFE, UsersRoles.COMITE, UsersRoles.COORDINADOR, UsersRoles.DIRECTOR, UsersRoles.ESTUDIANTE, UsersRoles.EVALUADOR, UsersRoles.JEFEDEPARTAMENTO ]
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
      allowed: [ UsersRoles.DIRECTOR, UsersRoles.COMITE, UsersRoles.COORDINADOR ],
      children: [
        {
          icon: PlaylistAddSharp,
          path: '/register',
          text: 'Registrar propuesta',
          allowed: [ UsersRoles.DIRECTOR ]
        },
        {
          icon: SubjectSharp,
          path: '/consult',
          text: 'Consultar propuestas',
          allowed: [ UsersRoles.DIRECTOR, UsersRoles.COMITE, UsersRoles.COORDINADOR ]
        },
      ]
    },
    {
      icon: FormatColorText,
      path: '/anteproyectos',
      text: 'Anteproyecto',
      allowed: [ UsersRoles.JEFEDEPARTAMENTO, UsersRoles.DIRECTOR, UsersRoles.COORDINADOR, UsersRoles.ASESOR, UsersRoles.EVALUADOR,  ],
      children: [
        {
          icon: UploadFile,
          path: '/register',
          text: 'Registrar Anteproyecto',
          allowed: [ UsersRoles.JEFEDEPARTAMENTO, UsersRoles.DIRECTOR, UsersRoles.COORDINADOR, UsersRoles.ASESOR, UsersRoles.EVALUADOR ]
        },
        {
          icon: Description,
          path: '/consult',
          text: 'Consultar Anteproyectos',
          allowed: [ UsersRoles.JEFEDEPARTAMENTO, UsersRoles.DIRECTOR, UsersRoles.COORDINADOR, UsersRoles.ASESOR, UsersRoles.EVALUADOR ]
        },
      ]
    },
    // {
    //   icon: AdminPanelSettings,
    //   path: '/trabajoGrado',
    //   text: 'Trabajo de grado',
    //   allowed: [ UsersRoles.ADMIN ],
    //   children: [
    //     {
    //       icon: AdminPanelSettings,
    //       path: '/extensionRequest',
    //       text: 'Solicitar Prorroga',
    //       allowed: [ UsersRoles.ADMIN ]
    //     },
    //     {
    //       icon: AdminPanelSettings,
    //       path: '/edit',
    //       text: 'Modificar',
    //       allowed: [ UsersRoles.ADMIN ]
    //     },
    //     {
    //       icon: AdminPanelSettings,
    //       path: '/cancel',
    //       text: 'Cancelar',
    //       allowed: [ UsersRoles.ADMIN ]
    //     },
    //     {
    //       icon: AdminPanelSettings,
    //       path: '/suspent',
    //       text: 'Cancelar',
    //       allowed: [ UsersRoles.ADMIN ]
    //     },
    //   ]
    // },
        
  ]

  return menu;
}