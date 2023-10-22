import { axiosBackendAPI } from "..";
import { AxiosCall, LoginModel, UserModel } from "../../models";
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
        call: axiosBackendAPI.get<UserModel>(`/superUsuario/usuarios`, {signal: controller.signal,}),
        controller,
    };
}

export const updateUser = (userId: number, updatedUser: UserModel) => {
    const controller = loadAbort();
    return {
        call: axiosBackendAPI.put<UserModel>(`/superUsuario/usuarios/${userId}`, updatedUser ,{signal: controller.signal,}),
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
        call: axiosBackendAPI.post<any>(`/superUsuario/usuarios`, newUser ,{signal: controller.signal,}),
        controller,
    };
}

export const loggin = (data: LoginModel) => {
    const controller = loadAbort();
    return {
        call: axiosBackendAPI.post<UserModel>(`/superUsuario/usuariosLogin`, data, {signal: controller.signal}),
        controller,
    };
}
