import React from 'react'
import { RoleModel, UserModel } from '../../../models';
import { Box, Button, Card, CardContent, Divider, FormControl, Grid, IconButton, Switch, TextField, Typography, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { InputCustom, InputType, RenderRolesComponent, UserStateComponent } from '../../../components';
import { useUserForm } from '..';
import { useState, useEffect } from 'react';
import { PartialUserModel, defaultUserValues } from '../schemas/userFormSchema';
import { theme } from '../../../services/Theme/theme.service';
import { AddCircleSharp, Cancel } from '@mui/icons-material';
import { PinkSwitch, StyledCard } from '../../../styled-components';

interface IUserFormPageProps {
    user: UserModel;
}



export const UserForm = ({user}: IUserFormPageProps) => {
    const [editing, setEditing] = useState<boolean>(user == null ? false : true);
    const [toggle, setToggle] = useState<boolean>(true);
    const {
        control,
        errors,
        onSubmit,
        onUserCreate,
        onUserUpdate,
        getValues,
        user: currentUser,
        setValue,
        roles,
        loadRoles,
        setRoles,
        onCreateUser
    } = useUserForm({user});

    const onHandleEdit = () => {
        setEditing(false);
    }

    const onHandleUpdate = () => {
        onUserUpdate(getValues('id'), control._formValues as UserModel )
        setEditing(true);
    }

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
        const r = roles.filter( r => r.state === 'add');
        console.log('ACTUALIZAR ROLES', r);
        setValue('roles', r);
    }

    useEffect(() => {
        loadRoles();
    }, [])

    return (
        <Box sx={{ width: '100%'}}>

            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                <Typography> DATOS DE USUARIO </Typography>
                
                {user && currentUser.permissions.editUser && editing && (
                    <Button variant='contained' onClick={onHandleEdit} color='info' sx={{ width: '10rem' }}>
                        EDITAR
                    </Button>
                )}
                {user && currentUser.permissions.editUser && !editing && (
                    <Button 
                        variant='contained' 
                        onClick={onHandleUpdate} 
                        color='success' 
                        sx={{ 
                            color: '#fff', 
                            width: '10rem' 
                    }}>
                        ACTUALIZAR
                    </Button>
                )}
                {!user && currentUser.permissions.addUser && (
                    <Button 
                        variant='contained' 
                        onClick={() => onCreateUser(control._formValues as UserModel) } 
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

            <form>
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
                                        disabled={editing}
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
                                        disabled={editing}
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
                                        disabled={editing}
                                        value={user && `${user.lastname}`}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Controller
                                name={'email'}
                                control={control}
                                render={({ field }) => (
                                    <InputCustom
                                        name='email'
                                        errors={errors}
                                        label='Email'
                                        type={InputType.EMAIL}
                                        field={field}
                                        disabled={editing}
                                        value={user && `${user.email}`}
                                    />
                                )}
                            />
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
                            { user && (
                                <Box mt={-1} >
                                    <Typography variant={'caption'} sx={{ color: theme.palette.info.main }}>Estado</Typography>
                                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  sx={{ width: '100%' }}>
                                        <PinkSwitch disabled checked={user.state} />
                                        <UserStateComponent state={user.state} /> 
                                    </Box>
                                </Box>
                            )}
                            { !user &&(
                            <Controller
                                name={'state'}
                                control={control}
                                render={({ field }) => (
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
                            { user && (
                                <>
                                    <Typography variant={'caption'} sx={{ color: theme.palette.info.main }}>Roles</Typography>
                                    <StyledCard sx={{ display: 'flex', gap: 2, p: 2 }}>
                                        <RenderRolesComponent roles={user.roles} />
                                    </StyledCard>
                                </>
                            )}
                            { !user && (
                                <Controller
                                    name={'roles'}
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Typography variant={'caption'} sx={{ color: theme.palette.info.main }}>Roles</Typography>
                                            <StyledCard sx={{ display: 'flex', gap: 2, p: 2 }}>
                                                {roles.map( role => (
                                                    <Box 
                                                        key={role.id}
                                                        position={'relative'} 
                                                        sx={{ 
                                                            background: theme.palette.info.light ,
                                                            textAlign: 'center',
                                                            borderRadius: '5px',
                                                            pl: 2,
                                                            pr: 2,
                                                            textTransform: 'uppercase',
                                                            color: theme.palette.customs.dark,
                                                            height: '1.5rem'
                                                        }}
                                                    >
                                                        {
                                                            role.state === 'add'
                                                                ? 
                                                                <IconButton sx={{ position: 'absolute', top: -10, right: -10, m:0, p: 0 }} onClick={() => handleRoles(role)} >
                                                                    <Cancel color='error'/>
                                                                </IconButton>
                                                                : 
                                                                <IconButton sx={{ position: 'absolute', top: -10, right: -10, m:0, p: 0 }} onClick={() => handleRoles(role)}>
                                                                    <AddCircleSharp color='success'/>
                                                                </IconButton>
                                                        }
                                                        <Typography variant='subtitle2'>{role.type}</Typography>
                                                    </Box>
                                                ))}
                                            </StyledCard>
                                        </>
                                    )}
                                />
                            )}
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </Box>
    )
}
