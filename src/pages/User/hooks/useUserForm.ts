import { useTheme } from '@mui/material';
import { useFetchAndLoad } from '../../../hooks';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { PartialUserModel, defaultCreateUserValues, userCreateSchema, userUpdateSchema } from '../schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthInteface, RoleModel, UserModel } from '../../../models';
import Swal from 'sweetalert2';
import { createuser, getUser, updateUser } from '../../../services';
import { AppStore } from '../../../redux/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseUserFormProps {
    user?: UserModel
}

export const useUserForm = ({user}: IUseUserFormProps) => {
  const theme = useTheme();
  const {loading, callEndpoint} = useFetchAndLoad();
  const userState: AuthInteface = useSelector((state: AppStore) => state.user);
  const {roles}: {roles: RoleModel[]} = useSelector((state: AppStore) => state.roles);
  const [rolesState, setRoles] = useState<RoleModel[]>(roles);
  const navigate = useNavigate();

  const {register, control, handleSubmit, setValue, formState: { errors }, getValues} = useForm<PartialUserModel>({
    resolver: yupResolver(!user ? userCreateSchema : userUpdateSchema),
    defaultValues: user ? user : defaultCreateUserValues,
  });

  const onSubmit = async(data: UserModel) => {

    try{
      const oldData = await callEndpoint(getUser(data.id));

      const newUpdateUser = {...oldData.data, ...data}
      await callEndpoint(updateUser(newUpdateUser));

      navigate('/users', {replace: true})
      
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

  const onCreateUser = async(data: UserModel) => {
    data.id = parseInt(data.id.toString())
    data.email = data.email + '@unicauca.edu.co'
    try{
      await callEndpoint(createuser(data));

      Swal.fire({
        title: 'Usuario Creado',
        text: 'El usuario se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      navigate('/users', {replace: true})
    }catch(err){
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar crear el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
        
  }

  const onUserUpdate = async(data: UserModel) => {
    data.email = data.email + '@unicauca.edu.co'
    try{
      const oldData = await callEndpoint(getUser(data.id));
      const newUpdateUser = {...oldData.data, ...data}
      
      await callEndpoint(updateUser(newUpdateUser));

      Swal.fire({
        title: 'Felicitaciones',
        text: 'Se ha actualizado el usuario correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      navigate('/users', {replace: true})
    }catch(err){
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al actualizar el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  return {
    theme,
    handleSubmit,
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
    rolesState,
    roles: rolesState,
    setRoles,
  }
}  