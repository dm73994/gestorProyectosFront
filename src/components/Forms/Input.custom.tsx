import { Box } from '@mui/material';
import { FieldErrors } from 'react-hook-form';
import { theme } from '../../services';
import { StyledInput } from '../../styled-components/StyledInput';
import { formValidation } from '../../utils/formValidation';

interface InputProps {
  name: string;
  errors?: FieldErrors;
  label?: string;
  type: InputType;
  disabled?: boolean;
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