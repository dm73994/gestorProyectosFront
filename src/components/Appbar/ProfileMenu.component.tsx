import { Logout } from '@mui/icons-material'
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { logout } from '../../services';
import { useFetchAndLoad } from '../../hooks';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { loggOutUser } from '../../redux/slices/User/UserSlice';
import { getInitialsName } from '../../utils';
import { AppStore } from '../../redux/store';

export const ProfileMenu = () => {

  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {user} = useSelector((state: AppStore) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSession = async() => {
    try{
      await callEndpoint(logout());
      dispatch(loggOutUser())
      setAnchorEl(null);
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada correctamente',
        text: 'Vuelve pronto!',
        showConfirmButton: false,
        timer: 1500
      });
    }catch(err){
      console.log(err);
    }
  };

  const handleClose = async() => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, color: 'customs.dark', border: '1px solid black', bgcolor: 'transparent' }} >
              <Typography variant='caption'>
                {getInitialsName(user.name, user.lastname)}
              </Typography>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
              mt: 1.5,
              minWidth: '15rem',
              height: 'auto',
              background: theme => theme.palette.info.light,
              color: '#000',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'info.light',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseSession} sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography variant='body2'>CERRAR SESIÓN</Typography>
          <Logout fontSize="small" />
        </MenuItem>
      </Menu>

    </>
  )
}
