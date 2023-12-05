import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAnteproyecto } from '../../hooks/useAnteproyecto';
import { FormatViewRender } from '../../../../components/FormatView';
import { Box, Grid, Typography } from '@mui/material';
import { StyledCard } from '../../../../styled-components';
import { BackButton, CustomButton, CustomDivider, CustomDrawer } from '../../../../components';
import { CheckCircle, DoNotDisturb, Download, Handyman, PersonAdd, PostAdd, Visibility } from '@mui/icons-material';
import { AddFixedVersionModal, AddReviewModal } from '../../components';
import { FormEvaluators } from '.';
import { AproveAnteproyectoModal } from '../../components/AproveAnteproyectoModal';
import { useCosultAnteproyecto } from '../../hooks';

const ConsultAnteproyecto = () => {

  const {type, id} = useParams();
  const formatedId = String(id).replace('-', '.');

  const formatView = FormatViewRender();

  const {
    loading,
    currentUser,
    loadAnteproyectoById,
    consultFormatA,
    handleDownloadAnteproyecto,
    canAddReview,
    canAddEvaluators
  } = useAnteproyecto(type);

  const {
    openDrawer,
    openAproveModal,
    openFixedModal,
    openReviewModal,
    currentAnteproyecto,
    toggleDrawer,
    setOpenAproveModal,
    setOpenFixedModal,
    setOpenReviewModal,
    handleLoadAnteproyecto,
  } = useCosultAnteproyecto();

  /**
    * CARGAR ANTEPROYECTO ACTUAL
  */
  const handleLoadCurrentAnteproyecto = async () => {
    const anteproyecto = await loadAnteproyectoById(formatedId);
    handleLoadAnteproyecto(anteproyecto);
  };  

  /**
   * CARGAR ANTEPROYECTO ACTUAL AL INICIAR
   */
  useEffect(() => {
    handleLoadCurrentAnteproyecto();
  }, [])

  /**
   * AGREGAR COMPONENTES AL FORMATO VIEW AL CARGAR EL ANTEPROYECTO ACTUAL
   */
  useEffect(() => {
    if(currentAnteproyecto !== null) {
      formatView.addAnteproyecto(currentAnteproyecto);
      formatView.addVersionsComponent(currentAnteproyecto);
      console.log('🚀 ~ file: ConsultAnteproyecto.page.tsx:64 ~ useEffect ~ currentAnteproyecto:', currentAnteproyecto)
    }  
  }, [currentAnteproyecto]) 


  if(loading) return <div>Loading...</div>

  return (
    <StyledCard>

      { currentAnteproyecto && (
        <Grid container columnSpacing={1}>


          <Grid item xs={12} sx={{ ml: 3, mr: 3, pt: 2, position: 'relative'}}>
            <Box sx={{ position: 'absolute', top: 15, left: 0 }}>
              <BackButton />
            </Box>
            <Typography variant='h6' textTransform={'uppercase'} sx={{ mb: 2, textAlign: 'center' }}> {currentAnteproyecto.title} </Typography>
            <CustomDivider />
          </Grid>

          <Grid item xs={8} sx={{ overflowY: 'auto', height: '70vh', maxHeight: '70vh' }}>          
            {formatView.render()}
          </Grid>

          <Grid item xs={4}>
            <StyledCard sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>

              {/* CONSULTAR FORMATO A*/}
              {currentUser.permissions.anteproyecto.download && (
                <CustomButton 
                  onClick={() => consultFormatA(currentAnteproyecto.idPropuesta) } 
                  text={'Consultar Formato A'}
                  startIcon={<Visibility />}
                />
              )}

              {/* DESCARGAR ANTEPROYECTO */}
              {currentUser.permissions.anteproyecto.download && (
                <CustomButton 
                  onClick={() => handleDownloadAnteproyecto(currentAnteproyecto) } 
                  text={'Descargar Anteproyecto'}      
                  startIcon={<Download />}            
                />
              )}

              {/* SUBIR CORRECCION */}
              {currentUser.permissions.anteproyecto.addVersion && (
                <CustomButton 
                  onClick={() => setOpenFixedModal(true) } 
                  text={'Subir nueva versión'}      
                  startIcon={<Handyman />}            
                  color='warning.main'
                />
              )}

              {/* AGREGAR REVISION */}
              {canAddReview(currentAnteproyecto) && (
                <CustomButton 
                  onClick={() => setOpenReviewModal(true)} 
                  text={'Agregar revisión'}      
                  startIcon={<PostAdd />}            
                />
              )}

              {/* AGREGAR EVALUADORES */}
              {canAddEvaluators(currentAnteproyecto) && (
                <CustomButton 
                  onClick={toggleDrawer} 
                  text={'Agregar evaluadores'}      
                  startIcon={<PersonAdd />}            
                />
              )}

              {/* APROBAR ANTEPROYECTO */}
              {currentUser.permissions.anteproyecto.aprove && (
                <CustomButton 
                  onClick={() => setOpenAproveModal(true)} 
                  text={'Aprobar anteproyecto'}      
                  startIcon={<CheckCircle />}   
                  color='success.main'         
                />
              )}

              {/* RECHAZAR ANTEPROYECTO */}
              {currentUser.permissions.anteproyecto.reject && (
                <CustomButton 
                  onClick={() => {}} 
                  text={'Recharzar anteproyecto'}      
                  startIcon={<DoNotDisturb />}    
                  color='error.main'        
                />
              )}

            </StyledCard>
          </Grid>
        </Grid>
      )}


      {/* FORMULARIOS EXTRA Y MODALES */}

      <CustomDrawer open={openDrawer} toggleDrawer={toggleDrawer} title='Asignar evaluadores'>
        <FormEvaluators anteproyecto={currentAnteproyecto} />
      </CustomDrawer>

      <AproveAnteproyectoModal open={openAproveModal} handleClose={() => setOpenAproveModal(false) } />

      <AddFixedVersionModal open={openFixedModal} handleClose={() => setOpenFixedModal(false)} />

      <AddReviewModal open={openReviewModal} anteproyecto={currentAnteproyecto} handleClose={() => setOpenReviewModal(false) } />

    </StyledCard>
  )
}

export default ConsultAnteproyecto;