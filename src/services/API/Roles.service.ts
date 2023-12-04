import { axiosBackendAPI } from '..';

export const getRoles = () => {
  return axiosBackendAPI.get('/SuperUsuarioRoles/roles')
}
