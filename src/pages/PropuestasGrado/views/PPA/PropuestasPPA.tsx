import { useEffect } from 'react';
import { Box, Grid, List, Typography } from '@mui/material';
import { HeaderPropuestas } from '../../components/HeaderPropuestas/HeaderPropuestas';
import { ListPropuestaItem } from '../../components/ListPropuestaItem';
import { usePropuestasPPA } from '.';

export const PropuestasPPA = () => {
  const {
    propuestasUser,
    loading,
    getPrupuestasUsuario,
    handleConsultNavigation,
    filterPropuestasByEstado
  } = usePropuestasPPA();

  useEffect(() => {
    getPrupuestasUsuario();
  }, [])

  return (
    <Box>

      <HeaderPropuestas 
        filterByEstado={filterPropuestasByEstado}  
      />

      <Grid container>
        <Grid item xs={12} md={12}>
  
          <List>
            {loading && (
              <Typography variant='h6' textAlign={'center'}> Cargando... </Typography>
            )}
            {!loading && propuestasUser.length === 0 && (
              <Typography variant='h6' textAlign={'center'}> No hay propuestas de grado registradas </Typography>
            )}
            {!loading && propuestasUser.map((propuesta) => (
              <ListPropuestaItem key={propuesta.idPropuesta} propuesta={propuesta} handleConsultNavigation={handleConsultNavigation} />
            ))}
          </List>
  
        </Grid>
      </Grid>
  
    </Box>
  )
}
