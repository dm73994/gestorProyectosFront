import { Modal, Typography, Box, TextField, IconButton } from '@mui/material'
import React from 'react'
import { CustomDivider, CustomButton, FileUploader } from '../../../../components'
import { StyledCard } from '../../../../styled-components'
import { CloseSharp } from '@mui/icons-material';
import { TipoPropuesta, useAproveModal } from '../..';


interface IProps {
    open: boolean;
    handleClose: () => void;
    propuestaId: number;
    type: TipoPropuesta;
}


export const AproveModal = ({open, handleClose, propuestaId, type}: IProps) => {

  const {
    handleAprovePropuesta,
    handleAddComment,
    handleAddAproveFile,
    data
  } = useAproveModal()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledCard sx={{ 
        width: '80vw', 
        height: '90vh',     
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        paddingTop: '1rem',
        overflowY: 'auto', 
      }}>

        <Typography variant='h6' textAlign={'center'} sx={{ flexGrow: 3 }}> Aprovar propuesta </Typography>
        
        <Box display={'flex'} gap={4} justifyContent={'center'} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <IconButton onClick={handleClose}>
            <CloseSharp />
          </IconButton>
        </Box>
        <CustomDivider />

        <Typography variant='body2'>
            El proceso de aprobación de la propuesta de grado se realiza mediante un comentario y el documento de aprovación que avala dicha popuesta, una vez aprobado la propuesta se procesara para continuar al proceso de anteproyecto.
        </Typography>
        

        <Typography variant='body1' textAlign={'left'} sx={{ flexGrow: 2, mt: 2 }} > Comentario </Typography>
        <TextField 
          type='text'
          multiline
          onChange={(e) => handleAddComment(e.target.value)}
          style={{ width: '100%' }}
          inputProps={{
            style: {
              height: '5rem',
              overflowY: 'auto',
            }
          }}
        />
        
        <Box height={'15rem'} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <FileUploader setUploadedFile={handleAddAproveFile} uploadedFile={data.aproveFile} />
        </Box>

        <Box display={'flex'} gap={4}>
          <CustomButton text='Cancelar' color='error.main' onClick={handleClose} />
          <CustomButton 
            text='Aprovar' 
            color='success.main' 
            onClick={() => {
              handleAprovePropuesta(propuestaId, type)
              handleClose();
            }} 
          />
        </Box>

      </StyledCard>
    </Modal>
  )
}