import * as yup from 'yup';
import { UserModel } from '../../../models';

export type PartialUserModel = Partial<UserModel>;

export const userCreateSchema = yup.object<PartialUserModel>().shape({
  id: yup.number()
    .required('El id es requerido')
    .moreThan(0, 'El id debe ser mayor a 0')
    .test('len', 'El id debe tener 10 dígitos', (val) => val?.toString().length === 10),
  name: yup.string().required('El nombre requerido'),
  lastname: yup.string().required('El apellido requerido'),
  username: yup.string().required('El nombre de suario requerido'),
  email: yup.string().notOneOf(['@', '.com'], 'Solo ingrese el prefijo de su correo electrónico'),
  state: yup.boolean(),
  roles: yup
    .array()
    .min(1, 'Debe seleccionar al menos un rol')
    .required('Los roles son requeridos'),
  password: yup.string().min(8, 'La contraseña debe tener por lo menos 8 caracteres').required('La contraseña requerida'),
}).required();

export const userUpdateSchema = yup.object<PartialUserModel>().shape({
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
}).required();

export const defaultCreateUserValues: UserModel = {
  name: '',
  lastname: '',
  username: '',
  email: '',
  state: false,
  roles: [],
  password: '',
  id: undefined,
  token: '',
  permissions: undefined
}

export const defaultUpdateUserValues: Omit<UserModel, 'password' | 'id'> = {
  name: '',
  lastname: '',
  username: '',
  email: '',
  state: false,
  roles: [],
  token: '',
  permissions: undefined
}