import { Card, CardContent, Container, Grid, Typography, Box, Divider, FormControl, TextField, Button } from '@mui/material';
import React from 'react'
import { useLogin } from '.'
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { InputCustom } from '../../components';
import { InputType } from '../../components/Forms/Input.custom';
import { LoginForm } from './components';

const LoginPage = () => {
  const {theme, control, onSubmit, errors} = useLogin();

  {/* sm: small screens 600px
          md: medium screens 960px
          lg: large screens 1280px
          xl: extra large screens 1920px
  */}

  return (
      <Container sx={{ 
          background: '#171a4a',
          width: '100vw',
          height: '100vh',
          m: 0,
          p: 5,
        }}
      >
        <Grid container columns={{ sm: 1, md: 12}} sx={{ height: '100%', widht: '100%' }}>

          {/* SECCION DE CONTENIDO EXTRA */}
          <Grid item xs={12} md={8} sx={{ 
            background: 'linear-gradient(60deg, rgba(10,9,70,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
            p: 5,
            color: '#fff',
            position: 'relative',
          }}>
            <Typography variant='h5'> Universidad del Cauca </Typography>
            <Typography variant='body1'> Fiet </Typography>
            
            <Box sx={{ height: '100%' }}>
              <img src="src\assets\logoHorizontal.png" alt="" style={{filter: 'invert(100%)', width: '10rem', position: 'absolute', bottom: 30 }}/>
            </Box>
          </Grid>

          {/* SECCION DE LOGIN */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#F7F8FB', p: 5, height: '100%', widht: '100%', borderRadius: 0}}>
              <Box>
                <Typography variant='body1' fontStyle={'normal'}> BIENVENIDO </Typography>
              </Box>
              <Divider />
              <CardContent>
                  <LoginForm
                    onSubmit={onSubmit} 
                    control={control}
                    errors={errors}
                  />
              </CardContent>              
            </Card>
          </Grid>

        </Grid>
      </Container>
  )
}

export default LoginPage;
