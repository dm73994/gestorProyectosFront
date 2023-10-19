import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PrivateRouterWrapper, PublicRouterWrapper } from '.'
import { lazy } from 'react';
import { AppStore } from '../redux/store'
import { useSelector } from 'react-redux'

const LoginSuperFix = lazy(() => import('../pages/Login/Login.page') ) 
const UserSuperFix = lazy(() => import('../pages/User/profile/Profiles.page') ) 
const UsersListSuperFix = lazy(() => import('../pages/User/UsersList/UsersList.page') ) 



export const AppRouter = () => {
  const {loggedIn} = useSelector((state: AppStore) => state.user);

  const route = createBrowserRouter([
    // {
    //   path: '/*',
    //   element: <PrivateRouterWrapper component={<Navigate to={'/home'} />}  />
    // },
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
      element: <PrivateRouterWrapper component={<UsersListSuperFix />}  authorized={['administrado']} />
    },

  ])

  return (
    <RouterProvider router={route} />
  )
}
