import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { filterMenuByRole } from '../../utils';
import { navigationMenu } from '.';
import { NavLinkComponent } from '../../components';
import { List } from '@mui/material';

export const MenuGenerator = () => {
    const {user} = useSelector((state: AppStore) => state.user);
    const menu = filterMenuByRole(user, navigationMenu());

    return (
      <List disablePadding>
        {
          menu.map((item) => {
            // if (item.children) {
            //   return (
            //     <NavGroupComponent key={index} item={item} />
            //   )
            // }
            return (
              <NavLinkComponent 
                key={item.text} 
                text={item.text} 
                icon={<item.icon />} 
                path={item.path}  
              />
            )
          })
        }
      </List>
    )
}
