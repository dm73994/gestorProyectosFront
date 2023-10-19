import { Box, Input, InputBaseProps, InputLabel, TextField, Typography, styled, FormControl } from '@mui/material';
import { FieldErrors, UseFormRegister, UseFormTrigger, Controller, Control, ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { InputError } from '../../styled-components';

const formValidation = (errors: FieldErrors, errorKey: string) => {
  return errors[errorKey] ? <Typography className="error-message" variant='caption' color={'error'}>{`${errors[errorKey]?.message}`}</Typography> : <Typography>{'*'}</Typography>;
};

interface InputProps {
  // register?: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  label?: string;
  type: InputType;
  // inputProps?: InputBaseProps['inputProps'];
  disabled?: boolean;
  // trigger?: UseFormTrigger<any>;
  placeholder?: string;
  field?: any;
}

export enum InputType {
  NUMBER = 'number',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEXT = 'text',
  HIDDEN = 'hidden',
  CHECKBOX = 'checkbox'
}

const StyledInput = styled(TextField, { })(({ theme }) => ({
  '&.MuiInput-root': {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.default',
    border: `1px solid ${theme.palette.customs.main}`,
    borderRadius: '0.3rem',
    padding: '4px 8px',
    transition: 'all 0.3s', // Agregamos una transición para un efecto suave
  },
  '&:hover': {
    border: `1px solid ${theme.palette.customs.dark}`,
    backgroundColor: theme.palette.action.hover, // Establece el color de fondo al hacer hover
  },
  '&.Mui-error': {

  },
  '&.Mui-focused': {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.customs.dark}`,
  },
  '&.Mui-disabled': {

  }
}));

export const InputCustom = ({ name, errors, label = '', type, disabled = false, placeholder, field }: InputProps) => {
  
  return (
        <Box maxHeight={'5rem'} minHeight={'5rem'} width={'100%'} sx={{ width: '100%'}}>
          <StyledInput 
            label={label}
            variant='filled'
            type={type} 
            placeholder={placeholder}
            fullWidth
            error={!!errors[name]}
            disableUnderline
            {...field}
          />
          {errors[name] && formValidation(errors, name)}
        </Box>
  );
};