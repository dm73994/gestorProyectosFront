import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PrivateRouterWrapper, PublicRouterWrapper } from '.'
import { lazy } from 'react';
import { UsersRoles } from '../models';

const LoginSuperFix = lazy(() => import('../pages/Login/Login.page') ) 
const UserSuperFix = lazy(() => import('../pages/User/views/profile/Profiles.page') ) 
const UsersListSuperFix = lazy(() => import('../pages/User/views/UsersList/UsersList.page') ) 
const CreateUserSuperFix = lazy(() => import('../pages/User/views/create/CreateUser.page') )
const UpdateUserSuperFix = lazy(() => import('../pages/User/views/Update/Update.page') )
const RolesSuperFix = lazy(() => import('../pages/Roles/Roles.page') )

const NotFoundSuperFix = lazy(() => import('../pages/404/404.page') )

// Vistas Propuestas formato A 
const PropuestasSuperFix = lazy(() => import('../pages/PropuestasGrado/views/Propuestas.page') )
const RegisterPropuestaSuperFix = lazy(() => import('../pages/PropuestasGrado/views/RegisterPropuesta/RegistrarPropuesta.page') )
const ViewPropuestaSuperFix = lazy(() => import('../pages/PropuestasGrado/views/ViwePropuesta.page') )

// Vistas Anteproyecto formato B
const RegisterAnteproyectoSuperFix = lazy(() => import('../pages/Anteproyecto/views/create/RegistrarAnteproyecto.page') )
const ConsultAnteproyectoSuperFix = lazy(() => import('../pages/Anteproyecto/views/list/Anteproyectos.page') )
const ViewAnteproyectoSuperFix = lazy(() => import('../pages/Anteproyecto/views/consult/ConsultAnteproyecto.page') )

export const AppRouter = () => {

  const route = createBrowserRouter([
    {
      path: '/*',
      element: <NotFoundSuperFix />
    },
    {
      path: '/404',
      element: <NotFoundSuperFix />
    },
    {
      path: '/',
      element: <Navigate to={'/home'} />
    },
    {
      path: '/login',
      element: <PublicRouterWrapper component={<LoginSuperFix />}  />
    },
    {
      path: '/home',
      element: <PrivateRouterWrapper component={<UserSuperFix />} authorized={[]} />
    },
    {
      path: '/users',
      element: <PrivateRouterWrapper component={<UsersListSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },
    {
      path: '/users/create',
      element: <PrivateRouterWrapper component={<CreateUserSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },
    {
      path: '/users/update/:id',
      element: <PrivateRouterWrapper component={<UpdateUserSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },
    {
      path: '/users/update',
      element: <PrivateRouterWrapper component={<UpdateUserSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },
    {
      path: '/roles',
      element: <PrivateRouterWrapper component={<RolesSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },

    // RUTAS PROPUESTA TIPO A
    {
      path: '/propuestas/consult',
      element: <PrivateRouterWrapper component={<PropuestasSuperFix />}  authorized={[UsersRoles.DIRECTOR, UsersRoles.JEFEDEPARTAMENTO, UsersRoles.COMITE, UsersRoles.EVALUADOR, UsersRoles.COMITE, UsersRoles.COORDINADOR]} />
    },
    {
      path: '/propuestas/view/:type/:id',
      element: <PrivateRouterWrapper component={<ViewPropuestaSuperFix />}  authorized={[UsersRoles.DIRECTOR, UsersRoles.JEFEDEPARTAMENTO, UsersRoles.COMITE, UsersRoles.EVALUADOR, UsersRoles.COORDINADOR]} />
    },
    {
      path: '/propuestas/register',
      element: <PrivateRouterWrapper component={<RegisterPropuestaSuperFix />}  authorized={[UsersRoles.DIRECTOR]} />
    },

    // RUTAS ANTEPROYECTO TIPO B
    {
      path: '/anteproyectos/consult',
      element: <PrivateRouterWrapper component={<ConsultAnteproyectoSuperFix />}  authorized={[]} />
    },
    {      
      path: '/anteproyectos/view/:type/:id',
      element: <PrivateRouterWrapper component={<ViewAnteproyectoSuperFix />}  authorized={[]} />
    },
    {
      path: '/anteproyectos/register',
      element: <PrivateRouterWrapper component={<RegisterAnteproyectoSuperFix />}  authorized={[]} />
    },

  ])

  return (
    <RouterProvider router={route} />
  )
}
