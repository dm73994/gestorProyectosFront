import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PrivateRouterWrapper, PublicRouterWrapper } from '.'
import { lazy } from 'react';
import { AppStore } from '../redux/store'
import { useSelector } from 'react-redux'

const LoginSuperFix = lazy(() => import('../pages/Login/Login.page') ) 
const UserSuperFix = lazy(() => import('../pages/User/views/profile/Profiles.page') ) 
const UsersListSuperFix = lazy(() => import('../pages/User/views/UsersList/UsersList.page') ) 
const CreateUserSuperFix = lazy(() => import('../pages/User/views/create/CreateUser.page') )
const UpdateUserSuperFix = lazy(() => import('../pages/User/views/Update/Update.page') )
const RolesSuperFix = lazy(() => import('../pages/Roles/Roles.page') )



export const AppRouter = () => {
  const {loggedIn} = useSelector((state: AppStore) => state.user);

  const route = createBrowserRouter([
    {
      path: '/*',
      element: <Navigate to={'/home'}  />
    },
    {
      path: '/login',
      element: <PublicRouterWrapper component={<LoginSuperFix />}  />
    },
    {
      path: '/home',
      element: <PrivateRouterWrapper component={<UserSuperFix />}  />
    },
    {
      path: '/users',
      element: <PrivateRouterWrapper component={<UsersListSuperFix />}  authorized={['Administrador']} />
    },
    {
      path: '/users/create',
      element: <PrivateRouterWrapper component={<CreateUserSuperFix />}  authorized={['Administrador']} />
    },
    {
      path: '/users/update/:id',
      element: <PrivateRouterWrapper component={<UpdateUserSuperFix />}  authorized={['Administrador']} />
    },
    {
      path: '/roles',
      element: <PrivateRouterWrapper component={<RolesSuperFix />}  authorized={['Administrador']} />
    },

  ])

  return (
    <RouterProvider router={route} />
  )
}
