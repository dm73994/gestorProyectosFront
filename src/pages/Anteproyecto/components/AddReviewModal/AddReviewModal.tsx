import { CustomModal } from '..';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FileUploader } from '../../../../components';
import { red } from '@mui/material/colors';
import { useAddReviewAnteproyecto } from './hooks';
import { DetailsAnteproyecto } from '../../../../models';


interface IProps {
  open: boolean;
  anteproyecto: DetailsAnteproyecto;
  handleClose: () => void;
}

export const AddReviewModal = ({open, anteproyecto, handleClose}: IProps) => {

  const {
    data,
    handleComentario,
    handleUploadReviewFile,
    handleUploadAnnotationsFiles,
    handleAddReview
  } = useAddReviewAnteproyecto();

  return (
    <CustomModal
      open={open} 
      props={{
        title: 'Agregar revisión', 
        description: 'Agregue una revisión al anteproyecto, esta revisión será de ayuda para la corrección y nueva versión del anteproyecto creada por el director.'
      }} 
      handleClose={handleClose} 
      successFunction={() => handleAddReview(anteproyecto.reviews[anteproyecto.version-1])} 
    >

      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', flexDirection: 'column', alignItems: 'left', gap: 2, }}>
          <Typography variant='body1' fontWeight={'bold'}> Observaciones </Typography>
          <Box>
            {/* <Typography> {errors[0]} </Typography> */}
          </Box>
          <Box style={{ minHeight: 100, maxHeight: 100, width: '100%', overflowY: 'auto' }}>
            <TextField
              type='text'
              multiline
              onChange={(e) => handleComentario(e.target.value)}
              style={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
            
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant='body1' fontWeight={'bold'} textAlign={'center'} > Documento de evaluación <span style={{ color: red.A700 }}>(*)</span> </Typography>
          <Box>
            {/* <Typography> {errors[1]} </Typography> */}
          </Box>
          <FileUploader setUploadedFile={handleUploadReviewFile} uploadedFile={data.reviewFile} />
        </Grid>

        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant='body1' fontWeight={'bold'} > Documento de anteproyecto con observaciones </Typography>
          <FileUploader setUploadedFile={handleUploadAnnotationsFiles} uploadedFile={data.annotationsFiles} />
        </Grid>

      </Grid>
        

    </CustomModal>
  )
}
