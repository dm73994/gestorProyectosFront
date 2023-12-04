import React from 'react'
import { DetailsPropuesta } from '../../../../models/Formatos/DetailsPropuesta.model';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import { UserModel } from '../../../../models';
import { UserBrief } from '../../../../components';
import { getInitialsName } from '../../../../utils';

interface IPropuestaCard {
  props: DetailsPropuesta,
}

export const PropuestaCard = ({ props }: IPropuestaCard) => {

  return (
    <Box>
      {/* SECCION DE PARTICIPANTE */}
      <Grid container>

        <Grid container rowSpacing={2}>
          <Typography variant='subtitle2' textAlign={'left'}> PARTICIPANTES </Typography>
                
          <Grid item xs={12} md={4}>
            <UserBrief title={'Director'} {...props.director} />
          </Grid>
          {props.codirector && (
            <Grid item xs={12} md={4}>
              <UserBrief title={'Codirector'} {...props.codirector} />
            </Grid>
          )}
          {props.estudiantes.map( (estudiante: UserModel) => (
            <Grid item xs={12} md={4} key={estudiante.id}>
              <UserBrief title={'Estudiante'} {...estudiante} />
            </Grid>
          ))}
        </Grid>


        {/* SECCION DE ESTADO */}
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant='subtitle2' textAlign={'left'}> INFORMACIÓN </Typography>
        <Grid container mt={5} >
            
          {/* ESTADO DE PROPUESTA */}
          <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
            <Typography variant='body2' textAlign={'center'}> Estado del documento </Typography>
            <Box sx={{ 
              backgroundColor: `${props.avalado !== null ? 'success.main' : 'warning.main'}`, 
              color: '#fff', 
              padding: '4px 16px', 
              borderRadius: '5px',
              ml: 2 
            }}>
              <Typography variant='body2' textAlign={'center'}> {props.avalado === null ? 'REVISIÓN' : 'AVALADO'} </Typography>
            </Box>
          </Grid>

          {/* FECHA DE CREACION DE PROPUESTA */}
          <Grid item xs={12} md={6} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <Typography textAlign={'center'}> Fecha de publicación </Typography>
            <Typography textAlign={'center'}> {props.date.toLocaleDateString()} </Typography>
          </Grid>
        </Grid>

        

        {/* REVIEWS */}
        <Grid container mt={5}>
          <Grid item xs={12} display={'flex'}>
            <Typography variant='subtitle2' textAlign={'left'}> REVISIONES </Typography>
            <Typography variant='caption' textAlign={'left'}> ({props.revisiones.length}) </Typography>
          </Grid>
          {props.revisiones.map( review => (
            <Grid key={review.idRevisionComite} item xs={12} paddingY={3} paddingRight={5}>
              <Box display={'flex'} gap={2}>
                <Avatar>
                  <Typography> {getInitialsName(review.identificacionComitePrograma.name, review.identificacionComitePrograma.lastname)} </Typography>
                </Avatar>
                <Box
                  sx={{
                    position: 'relative',
                    padding: '1rem 1rem',
                    borderRadius: '5px',
                    boxShadow: '-0.0em 0.1em .2em #000',
                    flexGrow: 2
                  }}
                >
                  <Typography variant='caption' textAlign={'left'} color={'info.main'} sx={{ position: 'absolute', top: 0, left: 5 }}> @{review.identificacionComitePrograma.username} </Typography>
                  <Typography variant='caption' textAlign={'left'}> {review.comentariosRevisionComite} </Typography>
                  <Typography fontSize={10} color={'text.disabled'} textAlign={'left'} sx={{ position: 'absolute', bottom: 0, right: 5 }}> {review.fechaRespuesta.toLocaleDateString()} </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>


      </Grid>

    </Box>

  )
}
