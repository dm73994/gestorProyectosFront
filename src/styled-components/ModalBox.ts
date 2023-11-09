import { Box, styled } from '@mui/material';



export const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  background: '#fff',
  borderRadius: '5px',
  // boxShadow: 24,
  padding: '1rem 2rem',
}))