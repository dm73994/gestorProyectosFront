import { RoleModel, UserModel } from '../../../models';
import { Box, Button, Divider, FormControl, Grid, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { BackButton, CustomLoader, InputCustom, InputType, RenderRolesComponent, UserStateComponent } from '../../../components';
import { useUserForm } from '..';
import { useState, useEffect } from 'react';
import { theme } from '../../../services/Theme/theme.service';
import { PinkSwitch, StyledCard, StyledInput } from '../../../styled-components';
import { useNavigate } from 'react-router-dom';
import { CRUDActions } from '../../../models/Actions/CRUDActions.model';
import { filterUserRoles } from '../../../utils';

interface IUserFormPageProps {
    user: UserModel;
    action: CRUDActions;
}

export const UserForm = ({user, action}: IUserFormPageProps) => {
  
  const [toggle, setToggle] = useState<boolean>(true);
  const {
    control,
    errors,
    onCreate,
    onUpdate,
    user: currentUser,
    setValue,
    roles,
    setRoles,
    loading,
    getValues
  } = useUserForm({user});
  const navigate = useNavigate()

  // Controlador de toggle button para controlar el estado editando o creando usuarios
  const onStatusChange= () => {
    setValue('state', toggle);
    setToggle(!toggle);
  }

  const handleRoles = (role: RoleModel) => {
    if(role.state === 'add'){
      role.state = 'remove';
    }else{
      role.state = 'add';
    }
    setRoles(roles.map( r => r.id === role.id ? role : r));
    const r = roles.filter( r => r.state === 'remove');

    setValue('roles', r);
  }

  useEffect(() => {
    if(action !== CRUDActions.READ){
      const rolesUserToUpdate = filterUserRoles(user);
      /**
       * Si el usuario existe y se esta actualizando se debe filtrar los roles que tiene el usuario
       * y compararlos con los roles qu¿e el usuario ya tiene asignados
       */
      const updatesRoles: RoleModel[] = roles.map(rol => {
        if( rolesUserToUpdate.includes(rol.type) ) 
          return {...rol, state: 'remove'}        
        return {...rol, state: 'add'}
      })
      /**
       * Se actualizan los roles del usuario dentro del formulario
      */
      setRoles( updatesRoles )

    }
  }, [])
  
  return (
    <Box sx={{ width: '100%'}}>

      {loading && (
        <CustomLoader />
      )}
      <form>
        <Box display={'flex'} justifyContent={'space-between'} mb={2}>
          {action !== CRUDActions.READ && (
            <BackButton />
          )}

          <Typography> DATOS DE USUARIO </Typography>
                
          {user && currentUser.permissions.user.edit && action === CRUDActions.READ && (
            <Button 
              variant='contained' 
              onClick={() => navigate('/users/update')} 
              color='info' 
              sx={{ width: '10rem' }}
            >
            EDITAR
            </Button>
          )}
          {user && currentUser.permissions.user.edit && action === CRUDActions.UPDATE && (
            <Button 
              type='submit'
              variant='contained' 
              onClick={onUpdate}
              color='success' 
              sx={{ 
                color: '#fff', 
                width: '10rem' 
              }}
            >
              ACTUALIZAR
            </Button>
          )}
          {!user && currentUser.permissions.user.add && action === CRUDActions.CREATE && (
            <Button 
              type='submit'
              variant='contained' 
              onClick={onCreate} 
              color='success' 
              sx={{ 
                color: '#fff', 
                width: '10rem' 
              }}>
              CREAR USUARIO
            </Button>
          )}
        </Box>
            
        <Divider sx={{ mb: 4}} />

      
        <FormControl>
          <Grid container spacing={2} sx={{ mr: 0}}>
            {!user && (
              <Grid item md={6}>
                <Controller
                  name={'id'}
                  control={control}
                  defaultValue={user && user.id}
                  render={({ field }) => (
                    <InputCustom 
                      name='id' 
                      errors={errors} 
                      label='Identificación' 
                      type={InputType.NUMBER} 
                      field={field} 
                      disabled={user == null ? false : true }
                      value={user && `${field.value}`}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item md={6}>
              <Controller
                name={'username'}
                control={control}
                defaultValue={user? user.username : null}
                render={({ field }) => (
                  <InputCustom
                    name='username'
                    errors={errors}
                    label='Nombre de usuario'
                    type={InputType.TEXT}
                    field={field}
                    disabled={action === CRUDActions.READ}
                    value={user && `${user.username}`}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                name={'name'}
                control={control}
                render={({ field }) => (
                  <InputCustom 
                    name='name'
                    errors={errors}
                    label='Nombre'
                    type={InputType.TEXT}
                    field={field}
                    disabled={action === CRUDActions.READ}
                    value={user && `${user.name}`}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                name={'lastname'}
                control={control}
                render={({ field }) => (
                  <InputCustom
                    name='lastname'
                    errors={errors}
                    label='Apellido'
                    type={InputType.TEXT}
                    field={field}
                    disabled={action === CRUDActions.READ}
                    value={user && `${user.lastname}`}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: 'flex', }}>
                {action === CRUDActions.READ && (
                  <StyledInput
                    label='email'
                    disabled
                    value={user && `${user.email}`} 
                  />
                )}
                {action === CRUDActions.CREATE && (
                  <>
                    <Controller
                      name={'email'}
                      control={control}
                      render={({ field }) => (
                        <InputCustom
                          name='email'
                          errors={errors}
                          label='prefijo-email'
                          type={InputType.TEXT}
                          field={field}
                          value={user && `${user.email}`} />
                      )} 
                    />

                    <StyledInput
                      label='subfijo-email'
                      disabled
                      value={'@unicauca.edu.co'} 
                    />
                  </>
                )}
              </Box>
            </Grid>
            {!user && (
              <Grid item md={6}>
                <Controller
                  name={'password'}
                  control={control}
                  render={({ field }) => (
                    <InputCustom
                      name='password'
                      errors={errors}
                      label='Contraseña'
                      type={InputType.PASSWORD}
                      field={field}
                      disabled={!user ? false : true}
                      value={user && `${user.password}`}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item md={6}>
              { !user && currentUser.permissions.user.active && (
                <Controller
                  name={'state'}
                  control={control}
                  render={() => (
                    <>
                      <Box mt={-1} >
                        <Typography variant={'caption'} sx={{ color: theme.palette.info.main }}>Estado</Typography>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  sx={{ width: '50%' }}>
                          <PinkSwitch  onChange={onStatusChange} value={toggle} name='state' />
                          <UserStateComponent state={!toggle} /> 
                        </Box>
                      </Box>
                    </>
                  )}
                />
              )}
            </Grid>
            <Grid item md={12}>
              { currentUser.permissions.role.edit && (
                <>
                  <Typography variant={'caption'} sx={{ color: theme.palette.info.main }}>Roles</Typography>
                  <StyledCard>
                    <Grid container spacing={3} p={4}>
                      <RenderRolesComponent  roles={roles} handleRoleState={handleRoles} />
                    </Grid>
                  </StyledCard>
                </>
              )}

            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Box>
  )
}
