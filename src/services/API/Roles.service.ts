import { axiosBackendAPI } from '..';
import { RoleModel } from '../../models';
import { loadAbort } from '../../utils';

export const getRoles = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get<RoleModel>('/SuperUsuarioRoles/roles', {signal: controller.signal,}),
    controller,
  };
}
