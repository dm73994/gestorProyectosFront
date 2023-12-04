import { Typography, Grid, Box } from '@mui/material'
import React from 'react'
import { UserBrief } from '..'
import { UserModel } from '../../models'


interface IFormatViewParticipants {
    director: UserModel,
    codirector?: UserModel,
    estudiantes: UserModel[],
    asesor?: UserModel,
}

export const FormatViewParticipants = ({director, codirector, estudiantes, asesor}: IFormatViewParticipants) => {
  return (
    <Box sx={{ padding: '2rem 2rem 0rem 2rem', width: '100%' }}>
      <Typography sx={{ mb: 2 }}> PARTICIPANTES </Typography>

      <Grid container>

        {director && (
          <Grid item xs={12} md={4}>
            <UserBrief title={'Director'} name={director.name + director.lastname} username={director.username} />
          </Grid>
        )}
        {codirector && (
          <Grid item xs={12} md={4}>
            <UserBrief title={'Codirector'} name={codirector.name + codirector.lastname} username={codirector.username} />
          </Grid>
        )}
        {asesor && (
          <Grid item xs={12} md={4}>
            <UserBrief title={'Codirector'} name={asesor.name + asesor.lastname} username={asesor.username} />
          </Grid>
        )}
        {estudiantes.map( (estudiante: UserModel) => (
          <Grid item xs={12} md={4} key={estudiante.id}>
            <UserBrief title={'Estudiante'} name={estudiante.name + estudiante.lastname} username={estudiante.username} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
