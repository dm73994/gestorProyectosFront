import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { LoginModel } from '../../../models';
import { defaultLoginValues, loginSchema } from '..';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../../services';
import { useDispatch } from 'react-redux';
import { useFetchAndLoad } from '../../../hooks';
import { loggInUser } from '../../../redux/slices/User/UserSlice';
import { UserAdapter } from '../../../adapters';
import Swal from 'sweetalert2';




export const useLogin = () => {
  const theme = useTheme();
  const {callEndpoint} = useFetchAndLoad();
  const dispatch = useDispatch();

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
      dispatch(loggInUser(user));
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