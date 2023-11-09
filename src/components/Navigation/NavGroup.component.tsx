import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLinkProps } from '../../models'
import { NavLinkComponent } from '.'
import { useTheme } from '@mui/material/styles';

interface GroupProps {
    links: NavLinkProps[],
    groupTitle: string,
    groupIcon: any,
}

export const NavGroupComponent = ({links, groupTitle, groupIcon}: GroupProps) => {
  const {palette} = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon sx={{ color: palette.customs.dark }}>
            {groupIcon}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={groupTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit className='animate__slideInDown'>
        <List disablePadding >
          {links.map( link => 
            <NavLinkComponent key={link.path} icon={<link.icon />} path={link.path} text={link.text} agruoped/>
          )}
        </List>
      </Collapse>
    </>
  )
}
