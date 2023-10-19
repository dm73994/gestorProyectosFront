import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginModel } from '../../../models';

export const loginSchema = yup.object<LoginModel>().shape({
    username: yup.string().required('El nombre de suario requerido'),
    password: yup.string().min(8).required('La contraseña requerida'),
}).required();

export const defaultLoginValues: LoginModel = {
    username: '',
    password: '',
}