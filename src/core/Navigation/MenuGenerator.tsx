import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { filterMenuByRole } from '../../utils';
import { navigationMenu } from '.';

export const MenuGenerator = () => {
    const {user} = useSelector((state: AppStore) => state.user);
    const menu = filterMenuByRole(user, navigationMenu());
    return (
      <div>MenuGenerator</div>
    )
}
