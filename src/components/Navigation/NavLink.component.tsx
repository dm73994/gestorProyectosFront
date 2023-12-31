import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Icon } from '@mui/material';
import { NavLinkProps } from '../../models';



const StyledListItem = styled(ListItem)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.customs.dark,
  '&.active': {
    background: 'linear-gradient(86deg, rgba(23,26,74,1) 0%, rgba(9,9,121,0.9903419986158526) 38%, rgba(217,0,21,1) 100%)',
    //background: theme.palette.customs.dark,
    color: theme.palette.text.secondary,
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
    textDecoration: 'none',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  '&.pending': {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}))

export const NavLinkComponent = ({text, icon, path, agruoped}: NavLinkProps) => {
  const [active, setActive] = useState<boolean>(false)
  const {palette} = useTheme();

  const handleActive = (state) => {
    setActive(state);
  }
  return (
    <NavLink
      key={text}
      to={path} 
      className={ ({isActive, isPending}) => {
        handleActive(isActive)
        return isPending ? 'pending' : isActive ? 'active' : ''
      }}
    >
      <StyledListItem disablePadding className={`${active && 'active'} link`} >
        <ListItemButton sx={{ pl: agruoped && 7 }}>
          <ListItemIcon>
            <Icon sx={{ color: active ? palette.customs.light : palette.customs.dark }}>
              {icon}
            </Icon>
          </ListItemIcon>
          <ListItemText primary={text}  />
        </ListItemButton>
      </StyledListItem>
    </NavLink>
  )
}
