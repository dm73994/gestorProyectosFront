import { TextField, styled } from '@mui/material';

export const StyledInput = styled(TextField, { })(({ theme }) => ({
  backgroundColor: '#fff',
  flexGrow: 1,
  borderRadius: '5px',
  borderColor: theme.palette.info.main,
  transition: 'all 0.3s', // Agregamos una transición para un efecto suave
  '&:hover': {
  },
  '&.Mui-error': {
  
  },
  '&.Mui-focused': {
    border: 'none',
  },
  '&.Mui-disabled': {
  
  }
}));
  