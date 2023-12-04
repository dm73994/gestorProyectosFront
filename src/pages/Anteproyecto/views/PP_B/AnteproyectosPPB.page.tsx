import { Box } from '@mui/material'
import React from 'react'
import { ListAnteproyectoItem } from '../../components'
import { useAnteproyectoPPB } from '.';

export const AnteproyectosPPB = () => {

  const {
    anteproyectos,
    handleNavigation
  } = useAnteproyectoPPB();

  return (
    <Box>
      {anteproyectos.map((anteproyecto) => (
        <ListAnteproyectoItem 
          key={anteproyecto.id} 
          anteproyecto={anteproyecto} 
          handleConsultNavigation={() => handleNavigation(anteproyecto.id)}
        />
      ))}
    </Box>
  )
}
