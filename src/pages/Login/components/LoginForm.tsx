import { FormControl, Button, styled, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form'
import { InputCustom, InputType } from '../../../components'

export const LoginForm = ({onSubmit, control, errors}) => {
  return (
    <form action="" onSubmit={onSubmit}>
      <FormControl  sx={{ width: '100%' }}>

        <Controller
          name={'username'}
          control={control}
          render={({ field }) => (
            <InputCustom name='username' errors={errors} label='Nombre de usuario' type={InputType.TEXT} field={field}/>
          )}
        />

        <Controller
          name={'password'}
          control={control}
          render={({ field }) => (
            <InputCustom name='password' errors={errors} label='Contraseña' type={InputType.PASSWORD} field={field}/>
          )}
        />
        
      </FormControl>

      <Button type='submit' variant='contained' fullWidth>
            Iniciar sesion
      </Button>
    </form>
  )
}
