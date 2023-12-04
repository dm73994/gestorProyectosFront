import { SwapVert } from '@mui/icons-material'
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'


type FilterButtonProps = {
  title: string;
  action: () => void;
}

interface IFilterProps{
  title: string;
  actions: FilterButtonProps[];
}

export const FilterButton = ({title, actions}: IFilterProps) => {

  const [curretAction, setCurrentAction] = useState<string>(title) // actions[0
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  
  const handleClose = async() => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  return (
    <Box sx={{ height: '100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <SwapVert color='info' sx={{ width: 32, height: 32 }} />
        <Button
          onClick={handleClick}
          sx={{ ml: 2, width: '10rem' }}
          variant='outlined'
        >
          <Typography sx={{ flexBasis: '5rem' }}>
            {curretAction}
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
        {actions.map((action) => (
          <MenuItem 
            onClick={() => {action.action(); setCurrentAction(action.title) }} 
            sx={{ display: 'flex', justifyContent: 'space-between' }} 
          >
            <Typography variant='body2'>{action.title}</Typography>
          </MenuItem>
        ))}

      </Menu>
    </Box>
  )
}