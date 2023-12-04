import { Typography, Grid, Box } from '@mui/material'
import { FormatState } from '..'

interface IFormatViewState {
    state: string,
    date: Date
}

export const FormatViewState = ({state, date}: IFormatViewState) => {
  return (
    <Box sx={{ padding: '2rem 2rem 0rem 2rem', width: '100%' }}>
      <Typography > INFORMACIÓN </Typography>

      <Grid container mt={5}>

        {/* ESTADO DE PROPUESTA */}
        <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='body2' textAlign={'center'}> Estado del documento </Typography>
          <FormatState state={state} />
        </Grid>

        {/* FECHA DE CREACION DE PROPUESTA */}
        <Grid item xs={12} md={6} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <Typography textAlign={'center'}> Fecha de publicación </Typography>
          <Typography textAlign={'center'}> {date && date.toLocaleDateString()} </Typography>
        </Grid>

      </Grid>

    </Box>
  )
}
