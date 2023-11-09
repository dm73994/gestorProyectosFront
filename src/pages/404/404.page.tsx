import { relative } from 'path';
import React from 'react'
import { StyledCard } from '../../styled-components';
import { Box, Button, CardContent, Typography } from '@mui/material';
import { theme } from '../../services';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleReturnNavigation = () => {
    navigate('/home', { replace: true });
  }
  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#F2FAFC',         
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <Box sx={{ 
        boxShadow: '7px 6px 5px 0px rgba(0,0,0,0.75)',
        WebkitBoxShadow: '7px 6px 5px 0px rgba(0,0,0,0.75)',
        MozBoxShadow: '7px 6px 5px 0px rgba(0,0,0,0.75)',
        width: '20rem',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '5px',

      }}>
        <CardContent>
          <Typography fontSize={92}> 404 </Typography>
          <Typography > Pagina no encontrada </Typography>
          <Button variant='contained' sx={{ mt: 2, height: 'auto', width: 'auto', zIndex: 100 }} onClick={handleReturnNavigation}>
            Volver a inicio
          </Button>
        </CardContent>
      </Box>

      <Box></Box>

      <div style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
        <img src="src\assets\faro.webp" alt="Lost" style={{ userSelect: 'none' }}/>
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#a2d9ff" fillOpacity=".5" d="M0,64L24,53.3C48,43,96,21,144,16C192,11,240,21,288,58.7C336,96,384,160,432,160C480,160,528,96,576,101.3C624,107,672,181,720,213.3C768,245,816,235,864,224C912,213,960,203,1008,176C1056,149,1104,107,1152,90.7C1200,75,1248,85,1296,74.7C1344,64,1392,32,1416,16L1440,0L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#a2d9ff" fillOpacity="1" d="M0,192L40,160C80,128,160,64,240,48C320,32,400,64,480,85.3C560,107,640,117,720,112C800,107,880,85,960,117.3C1040,149,1120,235,1200,245.3C1280,256,1360,192,1400,160L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="1" d="M0,192L40,213.3C80,235,160,277,240,266.7C320,256,400,192,480,149.3C560,107,640,85,720,96C800,107,880,149,960,176C1040,203,1120,213,1200,192C1280,171,1360,117,1400,90.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>


    </div>
  )
}

export default PageNotFound;
