import { Box, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import { StyledCard } from '../../../styled-components'
import { BiotechSharp, Visibility } from '@mui/icons-material'
import { CustomDivider, FiltroOrder } from '../../../components'
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { usePropuesta } from '..';


const PropuestasPage = () => {
  const {
    propuestasUser,
    navigation
  } = usePropuesta()

  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleConsult = (id: number) => {
    navigation(`/propuestas/view/${id}`, { replace: true })
  }

  return (
    <StyledCard sx={{ pl: 10, pr: 10 }}>

      <CardHeader 
        title='Lista de propuestas de grado'
        subheader=''
        sx={{ textAlign: 'center' }}
      />
      <CustomDivider />

      {/* HEADER DE LISTA */}
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2} >

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="DESDE"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{
                  field: { clearable: true },
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
              />
              <DatePicker
                label="HASTA"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{
                  field: { clearable: true },
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <FiltroOrder />

      </Box>

      {/* LISTA DE PROPUESTAS */}
      <StyledCard>
        <Grid container>
          <Grid item xs={12} md={12}>

            <List >
              {propuestasUser.map((propuesta) => (
                <>
                  <ListItem key={propuesta.idPropuesta} secondaryAction={
                    <Tooltip title='Ver propuesta'>
                      <IconButton onClick={() => handleConsult(propuesta.idPropuesta)}>
                        <Visibility color='info' />
                      </IconButton>
                    </Tooltip>
                  }>

                    <ListItemIcon>
                      <BiotechSharp />
                    </ListItemIcon>
                    <ListItemText primary={propuesta.title}/>
                    <Box display={'flex'} mr={4} >
                      <Typography variant='caption' textAlign={'center'}> Publicación {propuesta.date.toLocaleDateString()} </Typography>
                      <Box sx={{ backgroundColor: 'warning.main', color: '#fff', padding: '0px 4px', borderRadius: '5px', ml: 2 }}> 
                        <Typography variant='caption' textAlign={'center'}> Revisión </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                </>
              ))}
            </List>

          </Grid>
        </Grid>

        <Grid container columnSpacing={12} rowSpacing={4} p={10}>

          {/* {propuestasUser.map((propuesta) => 
            <Grid item xs={12} md={6} key={propuesta.title}>
              <PropuestaCard props={propuesta} permissions={currentUser.permissions} />
            </Grid>
          )} */}

        </Grid>

      </StyledCard>
    </StyledCard>
  )
}

export default PropuestasPage