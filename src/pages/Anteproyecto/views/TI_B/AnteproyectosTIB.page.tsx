import React from 'react'
import { useAnteproyectoTIB } from '.'
import { Box } from '@mui/material';
import { ListAnteproyectoItem } from '../../components';

export const AnteproyectosTIB = () => {

  const {
    anteproyectos,
    handleNavigation
  } = useAnteproyectoTIB();

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
