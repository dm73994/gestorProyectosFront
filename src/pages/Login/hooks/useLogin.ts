import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { LoginModel, permissionsModel } from '../../../models';
import { defaultLoginValues, loginSchema } from '..';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../../services';
import { useFetchAndLoad } from '../../../hooks';
import { loggInUser } from '../../../redux/slices/User/UserSlice';
import { UserAdapter } from '../../../adapters';
import Swal from 'sweetalert2';
import { getRoles } from '../../../redux';
import { useAppDispatch } from '../../../redux/store';
import { filterPermissionsByRole } from '../../../utils';




export const useLogin = () => {
  const theme = useTheme();
  const {callEndpoint} = useFetchAndLoad();
  const dispatch = useAppDispatch();

  const {register, control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultLoginValues,
    resetOptions: {
      keepErrors: false, // input errors will be retained with value update
    }
  });

  const onSubmit = async(data: LoginModel) => {
    try{
      const resp = await callEndpoint(login(data));
      const user = UserAdapter(resp.data);

      /**
       * Ajustamos los permisos del usuario logueado en el store de redux  
      */
      const rolesRaw: string[] = user.roles.map( rol => rol.type)
      const permissions: permissionsModel = filterPermissionsByRole(rolesRaw);

      user.permissions = permissions;

      /**
       * Guardamos el usuario en el store de redux
      */
      dispatch(loggInUser(user));
      dispatch(getRoles());
    }catch(err){
      Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  return {
    theme,
    onSubmit: handleSubmit(onSubmit),
    control,
    register,
    errors,
  }
}  