import { Box } from '@mui/material';
import React from 'react'
import { theme } from '../../services';

interface IUserStateProps {
    state: boolean;
}

export const UserStateComponent = ({state}: IUserStateProps) => {

  return (
    <>
      {state ? (
        <Box sx={{ bgcolor: theme.palette.success.main, color: '#fff', borderRadius: '5px', textAlign: 'center', width: '100%' }} >
                    Activo
        </Box>
      ) 
        : <Box sx={{ bgcolor: theme.palette.error.main, color: '#fff', borderRadius: '5px', pl: 1, pr: 1, textAlign: 'center', width: '100%' }} >
                    Deshabilitado
        </Box>
      }
    </>
  )
}
