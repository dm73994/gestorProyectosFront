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

export const loggin = (data: LoginModel) => {
    const controller = loadAbort();
    return {
        call: axiosBackendAPI.post<UserModel>(`/superUsuario/usuariosLogin`, {signal: controller.signal}),
        controller,
    };
}
