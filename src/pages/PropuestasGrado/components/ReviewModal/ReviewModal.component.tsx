import { Box, Modal, TextField, Typography } from '@mui/material'
import { StyledCard } from '../../../../styled-components'
import { CustomButton, CustomDivider } from '../../../../components';
import { TipoPropuesta, useReviewModal } from '../..';

interface IProps {
    open: boolean;
    handleClose: () => void;
    propuestaId: number;
    type: TipoPropuesta;
}

export const ReviewModal = ({open, handleClose, propuestaId, type}: IProps) => {

  const {
    handleAddReview,
    setComment
  } = useReviewModal();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledCard sx={{ 
        width: 400, 
        height: 400,     
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem' 
      }}>
        <Typography variant='h6' textAlign={'center'} sx={{ flexGrow: 2 }}> Agregar revisión </Typography>
        <CustomDivider />
        <Typography variant='body1' textAlign={'left'} sx={{ flexGrow: 2 }} > Comentario </Typography>

        <Box style={{ minHeight: 200, maxHeight: 200, width: '100%', overflowY: 'auto' }}>

          <TextField 
            type='text'
            multiline
            onChange={(e) => setComment(e.target.value)}
            style={{ minHeight: 200, maxHeight: 200, width: '100%' }}
          />
        </Box>

        <Box display={'flex'} gap={4} mt={2}>
          <CustomButton text='Cancelar' color='error.main' onClick={handleClose} />
          <CustomButton 
            text='Enviar' 
            onClick={() => {
              handleAddReview(propuestaId, type)
              handleClose();
            }} 
          />
        </Box>

      </StyledCard>
    </Modal>
  )
}