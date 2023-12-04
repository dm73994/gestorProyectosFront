import { Grid, List, Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { ListPropuestaItem } from '../../components/ListPropuestaItem'
import { HeaderPropuestas } from '../../components/HeaderPropuestas/HeaderPropuestas'
import { usePropuestasTIA } from '.'

export const PropuestasTIA = () => {
  const {
    propuestasUser,
    loading,
    getPrupuestasUsuario,
    handleConsultNavigation,
    filterPropuestasByEstado
  } = usePropuestasTIA();

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
            {propuestasUser.length === 0 && (
              <Typography variant='h6' textAlign={'center'}> No hay propuestas de grado registradas </Typography>
            )}
            {propuestasUser.map((propuesta) => (
              <ListPropuestaItem key={propuesta.idPropuesta} propuesta={propuesta} handleConsultNavigation={handleConsultNavigation} />
            ))}
          </List>
  
        </Grid>
      </Grid>
  
    </Box>
  )
}
