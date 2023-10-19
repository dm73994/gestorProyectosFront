import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages'
import { PrivateRouterWrapper, PublicRouterWrapper } from '.'
import { Typography } from '@mui/material'
import { lazy } from 'react';
import { AppStore } from '../redux/store'
import { useSelector } from 'react-redux'

const LoginSuperFix = lazy(() => import('../pages/Login/Login.page') ) 


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
      element: <PrivateRouterWrapper component={<Typography>HOLA DESDE HOME</Typography>}  />
    }
  ])

  return (
    <RouterProvider router={route} />
  )
}
