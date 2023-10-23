import {useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavigationContext } from '../../context';
import { Icon } from '@mui/material';
import { NavGroupComponent, NavLinkComponent } from '.';
import { HomeOutlined} from '@mui/icons-material';
import { drawerWidth } from '..';
import { MenuGenerator } from '../../core';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  background: theme.palette.background.default,
}));

export const NavbarComponent = () => {
  const {isOpen, closeMenu} = useContext(NavigationContext)
  const theme = useTheme();
  
    return (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: theme.palette.background.default,
            },
            background: theme.palette.background.default,
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
        >

          <DrawerHeader>
            <Box 
              sx={{ 
                display: 'flex', 
                height: '100%', 
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Icon sx={{ width: 'auto', height: 'auto' }} >
                <img src="src\assets\logoPNG.png" alt="unicauca" width={50} />
              </Icon>
              <IconButton onClick={closeMenu} sx={{ color: theme.palette.background.paper }}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Box>
          </DrawerHeader>

          <Divider />

          <MenuGenerator />

        </Drawer>

    );
}
