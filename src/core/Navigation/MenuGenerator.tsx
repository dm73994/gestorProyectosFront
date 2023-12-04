import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { filterMenuByRole } from '../../utils';
import { navigationMenu } from '.';
import { MenuModel, NavGroupComponent, NavLinkComponent } from '../../components';
import { List } from '@mui/material';

export const MenuGenerator = () => {
  
  const {user} = useSelector((state: AppStore) => state.user);
  const menu = filterMenuByRole(user, navigationMenu());

  /**
     * 
     * @param item Menu item to be filtered
     * @returns Filtered childrens from menu item and return a new array of NavLinkProps to be used in NavGroupComponent
     */
  const filterChildren = (item: MenuModel) => {
    return item.children.map(option => {
      return {
        text: option.text,
        icon: option.icon,
        path: item.path + option.path,
        agruoped: true,
      };
    });
  };
  
  return (
    <List disablePadding>
      {menu.map((item) => {
        if (item.children) 
          return <NavGroupComponent key={item.text} links={filterChildren(item)} groupTitle={item.text} groupIcon={<item.icon/>} /> 
        else
          return <NavLinkComponent key={item.text} text={item.text} icon={<item.icon />} path={item.path} />
      })
      }
    </List>
  );
}


