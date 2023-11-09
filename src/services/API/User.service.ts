import { axiosBackendAPI } from '..';
import { LoginModel, UserModel, UsersRoles } from '../../models';
import { loadAbort } from '../../utils';

export const getUser = (userId: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get<UserModel>(`/superUsuario/usuarios/${userId}`, {signal: controller.signal,}),
    controller,
  };
};

export const getUsers = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get<UserModel>('/superUsuario/usuarios', {signal: controller.signal}),
    controller,
  };
}

export const getUsersByRol = (rol: UsersRoles) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get<UserModel>('/superUsuario/usuarios', {
      signal: controller.signal,
      params: {
        rol: rol
      }
    }),
    controller,
  };
}

export const updateUser = (updatedUser: UserModel) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.put<UserModel>(`/superUsuario/usuarios/${updatedUser.id}`, updatedUser ,{signal: controller.signal,}),
    controller,
  };
}

export const changeUserState = (userId: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.patch<UserModel>(`/superUsuario/usuarios/state/${userId}`, {signal: controller.signal,}),
    controller,
  };
}

export const createuser = (newUser: UserModel) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.post('/superUsuario/usuarios', newUser ,{signal: controller.signal,}),
    controller,
  };
}

export const login = (data: LoginModel) => {
  return {
    call: axiosBackendAPI.post<UserModel>('/superUsuario/usuariosLogin', data)
  };
}

export const logout = () => {
  return {
    call: axiosBackendAPI.post<UserModel>('/superUsuario/logout')
  };
}
