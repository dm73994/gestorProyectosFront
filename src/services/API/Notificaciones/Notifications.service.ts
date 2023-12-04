import { axiosBackendAPI } from '../..';
import { loadAbort } from '../../../utils';

export const getNotifications = (userId: number) => {
  const controller = loadAbort();
    
  return {
    call: axiosBackendAPI.get(`/notificaciones/${userId}`, {signal: controller.signal,}),
    controller,
  };
};