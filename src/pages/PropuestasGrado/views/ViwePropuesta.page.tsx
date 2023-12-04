import { useEffect, useState } from 'react'
import { StyledCard } from '../../../styled-components'
import { useParams } from 'react-router-dom'
import { DetailsPropuesta } from '../../../models/Formatos/DetailsPropuesta.model';
import { BackButton, CustomButton, CustomDivider, CustomLoader } from '../../../components';
import { Box, Grid, Typography } from '@mui/material';
import { DownloadForOffline, FactCheck, NotInterested, RateReview } from '@mui/icons-material';
import { AproveModal, PropuestaCard, ReviewModal, usePropuesta, useReviewModal } from '..';
import { useAproveModal } from '../hooks/useAproveModal';

const ViwePropuesta = () => {

  const { id, type } = useParams();
  const [ propuesta, setPropuesta ] = useState<DetailsPropuesta>(null);

  const propuestaHandler = usePropuesta({ type: type });

  const {
    openAprove,
    handleOpenAprove,
    handleCloseAprove
  } = useAproveModal()

  const {
    openReview,
    handleOpenReview,
    handleCloseReview
  } = useReviewModal()
  

  const handleLoadPropuesta = async () => {
    const data = await propuestaHandler.consultPropuestaById(parseInt(id));
    setPropuesta( data );
  }

  useEffect(() => {
    handleLoadPropuesta();
  }, [])

  if(propuestaHandler.loading || !propuesta) return <CustomLoader />
  if(!propuestaHandler) return <Typography variant='h6' textAlign={'center'}> Internal Error :( </Typography>

  return (
    <StyledCard sx={{ padding: '2rem 6rem', position: 'relative'}}>
      <Box sx={{ position: 'absolute', top: 10, left: 10 }} >
        <BackButton path={'/propuestas/consult'} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' textAlign={'center'} sx={{ flexGrow: 2 }}> {propuesta.title} </Typography>
      </Box>
      <CustomDivider />

      <Grid container>  
        {/* INFORMACION DE PROPUESTA */}
        <Grid item xs={12} md={8} sx={{ borderRight: '0.5px solid ' }}>
          <PropuestaCard props={propuesta} />
        </Grid>
        
        {/* PULL DE ACCIONES */}
        <Grid 
          item 
          xs={12}
          md={4}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          flexDirection={'column'}
          gap={4}
          p={2}
        >

          <CustomButton 
            text='DESCARGAR PROPUESTA' 
            onClick={() => propuestaHandler.handleDownload(propuesta.idPropuesta, propuesta.estudiantes[0].username)} 
            startIcon={<DownloadForOffline />} 
          />

          {propuestaHandler.currentUser.permissions.propuesta.download && propuesta.avalado && (
            <CustomButton 
              text='DESCARGAR AVAL' 
              onClick={() => propuestaHandler.handleDownloadAproved(propuesta.idPropuesta, propuesta.estudiantes[0].username)} 
              startIcon={<DownloadForOffline />} 
            />
          )}

          {propuestaHandler.currentUser.permissions.propuesta.review === true && (
            <CustomButton 
              text='Agregar revisión' 
              onClick={handleOpenReview} 
              startIcon={<RateReview />} 
            />
          )}
          {propuestaHandler.currentUser.permissions.propuesta.aprove && propuesta.avalado === null && (
            <CustomButton 
              text='Avalar propuesta' 
              onClick={handleOpenAprove} 
              startIcon={<FactCheck />} 
              color='success.main'
            />  
          )}
          {propuestaHandler.currentUser.permissions.propuesta.aprove && propuesta.avalado === null && (
            <CustomButton 
              text='Rechazar propuesta' 
              onClick={() => {}} 
              startIcon={<NotInterested />}
              color='error.main'
            />
          )}
        </Grid>

      </Grid>

      {/* MODAL PARA AGREGAR REVIEWS */}
      <ReviewModal 
        open={openReview}
        handleClose={handleCloseReview}
        propuestaId={parseInt(id)}
        type={propuesta.type}
      />

      <AproveModal 
        open={openAprove}
        handleClose={handleCloseAprove}
        propuestaId={parseInt(id)}
        type={propuesta.type}
      />

    </StyledCard>
  )
}

export default ViwePropuesta