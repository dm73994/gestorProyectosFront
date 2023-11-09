import { useTheme } from '@mui/material';
import React from 'react'
import { useFetchAndLoad } from '../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { PartialUserModel, defaultUserValues, userSchema } from '../schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthInteface, RoleModel, UserModel } from '../../../models';
import Swal from 'sweetalert2';
import { createuser, getUser, updateUser } from '../../../services';
import { updateUserData } from '../../../redux/slices/User/UserSlice';
import { AppStore } from '../../../redux/store';
import { getRoles } from '../../../services/API/Roles.service';
import { useState, useEffect } from 'react';
import { RoleAdapter } from '../../../adapters';
import { useNavigate } from 'react-router-dom';

interface IUseUserFormProps {
    user?: UserModel
}

export const useUserForm = ({user}: IUseUserFormProps) => {
  const theme = useTheme();
  const {loading, callEndpoint} = useFetchAndLoad();
  const dispatch = useDispatch();
  const userState: AuthInteface = useSelector((state: AppStore) => state.user);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const navigate = useNavigate();


  const {register, control, handleSubmit, setValue, formState: { errors }, getValues} = useForm<PartialUserModel>({
    resolver: yupResolver(userSchema),
    defaultValues: user ? user : defaultUserValues,
    resetOptions: {
      keepErrors: false, // input errors will be retained with value update
    }
  });

  const onSubmit = async(data: UserModel) => {

    try{
      await callEndpoint(createuser(data));

      Swal.fire({
        title: 'Usuario Creado',
        text: 'El usuario se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      navigate('/users')
    }catch(err){
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar crear el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
        
  }

  const onCreateUser = async(data: UserModel) => {
    data.id = parseInt(data.id.toString())

    try{
      await callEndpoint(createuser(data));

      Swal.fire({
        title: 'Usuario Creado',
        text: 'El usuario se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      navigate('users', {replace: true})
    }catch(err){
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar crear el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
        
  }

  const onUserUpdate = async (updateData: UserModel) => {
    try{
      const oldData = await callEndpoint(getUser(updateData.id));
      const newUpdateUser = {...oldData.data, ...updateData}
      const response = await callEndpoint(updateUser(newUpdateUser));
      // dispatch(updateUserData(response.data));
      navigate('-1', {replace: true})
      Swal.fire({
        title: 'Felicitaciones',
        text: 'Se ha actualizado el usuario correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }catch(err){
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al actualizar el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  const loadRoles = async() => {
    try{
      // Obtener roles de la base de datos
      const {data} = await callEndpoint(getRoles());

      // Adaptar los roles para el front
      const rolesData = data?.map((rol) => RoleAdapter(rol))
      setRoles(rolesData);

    }catch(err){
      throw new Error(err.message);
    }
  }

  return {
    theme,
    onSubmit: handleSubmit(onSubmit),
    onCreate: handleSubmit(onCreateUser),
    onUpdate: handleSubmit(onUserUpdate),
    control,
    register,
    errors,
    getValues,
    loading,
    user: userState.user,
    setValue,
    loadRoles,
    roles,
    setRoles,
  }
}  