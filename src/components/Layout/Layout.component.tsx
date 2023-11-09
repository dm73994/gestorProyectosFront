import { Box, Container } from '@mui/material';
import { AppbarComponent, NavbarComponent } from '..';
import { NavigationContext } from '../../context';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { theme } from '../../services';

export const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.customs.main,
  paddingInline: '4rem',
  height: '100%',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));



export const LayoutComponent = ({children}) => {
  const {isOpen} = useContext(NavigationContext)

  return (
    <>
      <Box>
        <AppbarComponent />
        <NavbarComponent />

        <Main open={isOpen}>
          <Container  sx={{ backgroundColor: theme.palette.customs.main, padding: '0 !important' }}  >
            {children}
          </Container>
        </Main>
      </Box>
    </>
  )
}
