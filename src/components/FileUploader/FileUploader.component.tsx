/* eslint-disable no-unused-vars */
import { Box, Button, Typography, styled } from '@mui/material'
import { useFileUploader } from './hooks/useFileUploader';


const StyledFileUploader = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploaderBox = styled('div')({
  width: '50%',
  height: '80%',
  backgroundColor: 'aliceblue',
  border: '1px solid #000',
  padding: '10px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  cursor: 'pointer',
});

interface IFileUploaderProps {
  setUploadedFile: (file: File) => void;
  uploadedFile: File;
}

export const FileUploader = ({uploadedFile, setUploadedFile}: IFileUploaderProps) => {

  const {
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useFileUploader(uploadedFile, setUploadedFile);

  return (
    <UploaderBox
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='fileUploaderBg'
    >
      {uploadedFile === null && (
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, .15)',
          backdropFilter: 'blur(5px)',
        }}>
          <Typography variant='h6'>SUBIR DOCUMENTO WORD</Typography>
          <Typography> Para subir el archivo de tipo .doc o .docx arrastre aquí o </Typography>
          <Button component="label" variant='contained' color='primary' >
                Seleccione un archivo
            <StyledFileUploader type="file" />
          </Button>
        </Box>
      )}
      {uploadedFile != null && (
        <div>
          <Typography variant='h6'>Archivos Cargados:</Typography>
          <ul>
            <Box display={'flex'} sx={{ background: 'rgba(255,255,255, .8)', p: 2, borderRadius: '5px' }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0D6EFD" className="bi bi-file-earmark-word-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.485 6.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 9.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z"/>
              </svg>
              <p>{uploadedFile.name}</p>
            </Box>

          </ul>
        </div>
      )}
    </UploaderBox>
  );
}
