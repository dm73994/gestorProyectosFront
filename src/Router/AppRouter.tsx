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

// Vistas de director
// const AnteproyectoSuperFix = lazy(() => import('../pages/Director/Anteproyecto/Anteproyectos.page') )
// const RegisterAnteproyectoSuperFix = lazy(() => import('../pages/Director/Anteproyecto/RegistrarAnteproyecto.page') )
const PropuestasSuperFix = lazy(() => import('../pages/PropuestasGrado/views/Propuestas.page') )
const RegisterPropuestaSuperFix = lazy(() => import('../pages/PropuestasGrado/views/RegistrarPropuesta.page') )
const ViewPropuestaSuperFix = lazy(() => import('../pages/PropuestasGrado/views/ViwePropuesta.page') )
const NotFoundSuperFix = lazy(() => import('../pages/404/404.page') )



export const AppRouter = () => {

  const route = createBrowserRouter([
    {
      path: '/*',
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
      path: '/roles',
      element: <PrivateRouterWrapper component={<RolesSuperFix />}  authorized={[UsersRoles.ADMIN]} />
    },

    // RUTAS DIRECTOR
    {
      path: '/propuestas/consult',
      element: <PrivateRouterWrapper component={<PropuestasSuperFix />}  authorized={[UsersRoles.DIRECTOR]} />
    },
    {
      path: '/propuestas/view/:id',
      element: <PrivateRouterWrapper component={<ViewPropuestaSuperFix />}  authorized={[UsersRoles.DIRECTOR, UsersRoles.JEFEDEPARTAMENTO, UsersRoles.COMITE, UsersRoles.EVALUADOR]} />
    },
    {
      path: '/propuestas/register',
      element: <PrivateRouterWrapper component={<RegisterPropuestaSuperFix />}  authorized={[UsersRoles.DIRECTOR, UsersRoles.JEFEDEPARTAMENTO, UsersRoles.COMITE, UsersRoles.EVALUADOR]} />
    },

  ])

  return (
    <RouterProvider router={route} />
  )
}
