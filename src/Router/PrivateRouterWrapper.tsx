import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStore } from '../redux/store';
import { LayoutComponent } from '../components';
import { filterUserAuthorizationByRoles } from '../utils/filterUserAuthorizationByRoles';
import { UsersRoles } from '../models';

type IWrapperRouteProps = {
  component: React.ReactNode;
  authorized: UsersRoles[];
};

export const PrivateRouterWrapper = ({
  component,
  authorized,
}: IWrapperRouteProps) => {
  const userState = useSelector((state: AppStore) => state.user);
  const auth = userState.loggedIn; // determine if authorized, from context or however you're doing it

  /*
   * If authorized is empty, allow all users to access route
   * If authorized is not empty, check if user has any of the authorized roles
   */
  const isAllowed =
    authorized.length === 0
      ? true
      : filterUserAuthorizationByRoles(userState.user, authorized); // Determine if user is allowed to access route (authorized<string>

  /**
   * If user is not logged in, redirect to login page
   */
  if (!auth) {
    return <Navigate to={'/login'} replace />;
  }

  /*
   * If user is logged in but not authorized, redirect to 404 page
   */
  if (!isAllowed) {
    return <Navigate to={'/404'} replace />;
  }

  /**
   * If user is logged in and authorized, render component
   */
  return <LayoutComponent>{component}</LayoutComponent>;
};
