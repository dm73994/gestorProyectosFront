import { axiosBackendAPI } from '../../..';
import { loadAbort } from '../../../../utils';

export const downloadTemplatePP = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/plantillas/PP-A', { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}