import { CardContent, Grid, Typography, Box, Divider } from '@mui/material';
import { useLogin } from '.'
import { LoginForm } from './components';

const LoginPage = () => {
  const {control, onSubmit, errors} = useLogin();

  {/* sm: small screens 600px
          md: medium screens 960px
          lg: large screens 1280px
          xl: extra large screens 1920px
  */}

  return (
    <Box sx={{ 
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
    >
      <Grid container sx={{ height: '100%', widht: '100%', borderRadius: '5px' }}>

        {/* SECCION DE CONTENIDO EXTRA */}
        <Grid item xs={12} md={8} sx={{ 
          background: 'linear-gradient(60deg, rgba(10,9,70,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
          p: 5,
          color: '#fff',
          position: 'relative',
        }}>
          <Typography variant='h5'> Gestor Documentación TI & PP </Typography>
          <Typography variant='body1'> Facultad de ingeniería Electrónica y Telecomunicaciones </Typography>
            
          <Box sx={{ height: '100%' }}>
            <img src="src\assets\logoHorizontal.png" alt="" style={{filter: 'invert(100%)', width: '10rem', position: 'absolute', bottom: 30 }}/>
          </Box>
        </Grid>

        {/* SECCION DE LOGIN */}
        <Grid item xs={12} md={4} sx={{ 
          backgroundColor: '#F7F8FB',
          p: 5,
          height: '100%',
          widht: '100%',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Box>
            <Typography variant='body1' fontStyle={'normal'}> BIENVENIDO </Typography>
          </Box>
          <Divider />
          <CardContent sx={{ mt: 4 }} >
            <LoginForm
              onSubmit={onSubmit} 
              control={control}
              errors={errors}
            />
          </CardContent>              
        </Grid>

      </Grid>
    </Box>
  )
}

export default LoginPage;
