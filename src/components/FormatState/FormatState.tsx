import { Box, Typography } from '@mui/material';
import React from 'react'

interface IFormatStateProps {
    state: string;
}

export const FormatState = ({ state }: IFormatStateProps) => {

  let color = '';
  switch (state) {
  case 'REVISION': {
    color = 'warning.main';
    break;
  }
        
  case 'RECHAZADO': {
    color = 'error.main';
    break;
  }

  case 'APROBADO' || 'AVALADO': {
    color = 'success.main';
    break;
  }

  default: 
    color = 'warning.main';
  }



  return (
    <Box sx={{
      backgroundColor: `${color}`,
      color: '#fff',
      padding: '0px 4px',
      borderRadius: '5px',
      ml: 2
    }}>
      <Typography variant='caption' textAlign={'center'}>
        {state}
      </Typography>
    </Box>
  )
}
