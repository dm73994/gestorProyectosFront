import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';
import { LayoutComponent } from '../components';
import { filterUserRoles } from '../utils';
import { filterUserAuthorizationByRoles } from '../utils/filterUserAuthorizationByRoles';

type IWrapperRouteProps = {
  component: React.ReactNode;
};

export const PublicRouterWrapper = ({ component }: IWrapperRouteProps) => {
  const {loggedIn: auth} = useSelector((state: AppStore) => state.user);

  /*
  * If user is not logged in, redirect to login page
  */
  if ( !auth ) {
    return <>{component}</>
  }
  return <Navigate to='/home' />;

};
