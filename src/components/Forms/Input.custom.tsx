import { Box, Input, InputBaseProps, InputLabel, TextField, Typography, styled, FormControl } from '@mui/material';
import { FieldErrors, UseFormRegister, UseFormTrigger, Controller, Control, ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { InputError } from '../../styled-components';
import { red } from '@mui/material/colors';
import { theme } from '../../services';

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
  value?: string;
}

export enum InputType {
  NUMBER = 'number',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEXT = 'text',
  HIDDEN = 'hidden',
  CHECKBOX = 'checkbox',
  EMAIL = 'email'
}

const StyledInput = styled(TextField, { })(({ theme }) => ({
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


export const InputCustom = ({ name, errors, label = '', type, disabled = false, placeholder, field, value }: InputProps) => {
  return (
        <Box maxHeight={'5rem'} minHeight={'5rem'} width={'100%'} sx={{ width: '100%'}}>
          <StyledInput 
            value={value}
            label={label}
            variant='outlined'
            type={type} 
            placeholder={placeholder}
            fullWidth
            error={!!errors[name]}
            {...field}
            InputProps={{
              style: { 
                backgroundColor: '#fff',
                border: 'none',
                borderColor: 'blue'
              }
            }}
            InputLabelProps={{
              style: { color: theme.palette.info.main }, // Cambia el color del label como desees
            }}
            disabled={disabled}
          />
          {errors[name] && formValidation(errors, name)}
        </Box>
  );
};