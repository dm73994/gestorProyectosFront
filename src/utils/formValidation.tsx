import { Typography } from '@mui/material'
import { FieldErrors } from 'react-hook-form'

export const formValidation = (errors: FieldErrors, errorKey: string) => {
  return (
    errors[errorKey] 
      ? <Typography className="error-message" variant='caption' color={'error'}> {`${errors[errorKey]?.message}`} </Typography> 
      : <Typography>{'*'}</Typography>
  )
};