import { SwapVert } from '@mui/icons-material'
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const FiltroOrder = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClose = async() => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Button
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          variant='outlined'
        >
          <SwapVert color='info' />
          <Typography variant='caption'>
          Ordenar
          </Typography>
        
        </Button>
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
              background: '#fff',
              color: '#000',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: '#fff',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography variant='body2'>Más recientes</Typography>
        </MenuItem>

        <MenuItem onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography variant='body2'>Más antiguos</Typography>
        </MenuItem>

      </Menu>
    </Box>
  )
}

export default FiltroOrder