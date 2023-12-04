import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps{
  path?: string;
}

export const BackButton = ({path = undefined}: IProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if(path){
      navigate(path, {replace: true});
      return;
    }
    navigate( -1 );
  }

  return (
    <Button color='error' onClick={handleBack}>
      <ArrowBack />
      <Typography variant='body2'>Volver</Typography>
    </Button>
  )
}
