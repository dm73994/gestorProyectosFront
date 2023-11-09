import React, { useEffect, useState } from 'react'
import { StyledCard } from '../../../styled-components'
import { useParams } from 'react-router-dom'
import { DetailsPropuesta } from '../../../models/Formatos/DetailsPropuesta.model';
import { CustomButton, CustomDivider, CustomLoader } from '../../../components';
import { Box, Grid, Typography } from '@mui/material';
import { DownloadForOffline, FactCheck, NotInterested, RateReview } from '@mui/icons-material';
import { AproveModal, PropuestaCard, ReviewModal, usePropuesta, useReviewModal } from '..';
import { useAproveModal } from '../hooks/useAproveModal';

const ViwePropuesta = () => {

  const { id } = useParams();
  const [ propuesta, setPropuesta ] = useState<DetailsPropuesta>(null);

  const {
    getPropuestaById,
    loading,
    currentUser,
    handleDownload,
  } = usePropuesta();

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
    const data = await getPropuestaById(parseInt(id));
    setPropuesta( data );
    console.log('popuesta', data)
  }

  useEffect(() => {
    handleLoadPropuesta();
  }, [])

  if(loading || !propuesta) return <CustomLoader />

  return (
    <StyledCard sx={{ padding: '2rem 6rem'}}>
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
          {currentUser.permissions.propuesta.download && (
            <CustomButton 
              text='DESCARGAR PROPUESTA' 
              onClick={() => handleDownload(propuesta.idPropuesta, propuesta.estudiantes[0].username)} 
              startIcon={<DownloadForOffline />} 
            />
          )}
          {currentUser.permissions.propuesta.download && propuesta.aproved && (
            <CustomButton 
              text='DESCARGAR AVAL' 
              onClick={() => handleDownload(propuesta.idPropuesta, propuesta.estudiantes[0].username)} 
              startIcon={<DownloadForOffline />} 
            />
          )}
          {currentUser.permissions.propuesta.review && propuesta.aproved === null && (
            <CustomButton 
              text='Agregar revisión' 
              onClick={handleOpenReview} 
              startIcon={<RateReview />} 
            />
          )}
          {currentUser.permissions.propuesta.aprove && propuesta.aproved === null && (
            <CustomButton 
              text='Avalar propuesta' 
              onClick={handleOpenAprove} 
              startIcon={<FactCheck />} 
              color='success.main'
            />  
          )}
          {currentUser.permissions.propuesta.aprove && propuesta.aproved === null && (
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