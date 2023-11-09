import { Button, Typography } from '@mui/material'
import React from 'react'

interface IAddButtonProps {
    onClick: () => void;
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    color?: string;
}

export const CustomButton = ({onClick, text, startIcon = null, endIcon = null, color = 'info.main'}: IAddButtonProps) => {
  return (
    <Button 
      fullWidth
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        bgcolor: `${color}`
      }} 
      variant='contained'
      endIcon={endIcon} 
      startIcon={startIcon}
      onClick={onClick} 
    >
      <Typography variant='caption' sx={{ flexBasis: '12rem' }}> {text} </Typography>
    </Button>
  )
}
