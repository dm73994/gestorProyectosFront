import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginModel, RoleModel, UserModel } from '../../../models';

export type PartialUserModel = Partial<UserModel>;

export const userSchema = yup.object<PartialUserModel>().shape({
  id: yup.number().required('El id es requerido'),
  name: yup.string().required('El nombre requerido'),
  lastname: yup.string().required('El apellido requerido'),
  username: yup.string().required('El nombre de suario requerido'),
  email: yup.string().email('El formato del correo electrónico no es válido')
    .matches(/@unicauca\.edu\.co$/, 'El dominio del correo debe ser unicauca.edu.co')
    .required('El correo electrónico es requerido'),
  state: yup.boolean(),
  roles: yup
    .array()
    .min(1, 'Debe seleccionar al menos un rol')
    .required('Los roles son requeridos'),
  password: yup.string().min(8).required('La contraseña requerida'),
}).required();

export const defaultUserValues: UserModel = {
  name: '',
  lastname: '',
  username: '',
  email: '',
  state: false,
  roles: [],
  password: '',
  id: 0,
  token: '',
  permissions: undefined
}