import { Grid, Typography, Box, Avatar } from '@mui/material'
import React from 'react'
import { getInitialsName } from '../../utils'
import { DetailsReviewModel } from '../../pages/PropuestasGrado'


interface IFormatViewReviews {
    revisiones: DetailsReviewModel[]
}

export const FormatViewReviews = ({revisiones}: IFormatViewReviews) => {
  return (
    <>
      <Grid item xs={12} display={'flex'}>
        <Typography variant='subtitle2' textAlign={'left'}> REVISIONES </Typography>
        <Typography variant='caption' textAlign={'left'}> ({revisiones.length}) </Typography>
      </Grid>
      {revisiones.map( review => (
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
    </>
  )
}
