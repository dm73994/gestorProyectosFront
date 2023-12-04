import { axiosBackendAPI } from '../../..';
import { PropuestaModelBackend } from '../../../../models';
import { ReviewModel } from '../../../../pages/PropuestasGrado';
import { loadAbort } from '../../../../utils';


export const createPropuestaTI = (propuesta: PropuestaModelBackend) => {
  const controller = loadAbort();

  const data = {
    title: propuesta.title,
    idDirector: propuesta.idDirector,
    idEstudiante1: propuesta.estudiantes[0],
    idEstudiante2: propuesta.estudiantes[1],
    idCodirector: propuesta.idCodirector,
    idAsistente: propuesta.idAsistente,        
    file: propuesta.file,
  }
  
  return {
    call: axiosBackendAPI.post('/PropuestasTI_A/propuestas', 
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ),
    controller,
  };
};


export const obtenerPropuestasTIByDirector = (idDirector: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/PropuestasTI_A/propuestasDirector',
      {
        params: {idDirector}
      }
    ),
    controller,
  };
}

export const obtenerPropuestasTIByDirectorYEstado = (idDirector: number, estado: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasTI_A/propuestasDirector/estado/${estado}`,
      {
        params: {idDirector}
      }
    ),
    controller,
  };
}

export const obtenerPropuestasTIByEstado = (estado: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasTI_A/propuestas/estado/${estado}`),
    controller,
  };
}

export const obtenerPropuestasTI = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/PropuestasTI_A/propuestas'),
    controller,
  };
}

export const obtenerPropuestaTIById = (id: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasTI_A/propuestas/${id}`),
    controller,
  };
}

export const downloadTemplateTI = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/plantillas/TI-A', { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}

export const downloadPropuestaTI = (idPropuesta: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasTI_A/propuestasSubidas/${idPropuesta}`, { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}

export const downloadPropuestaAprovadaTI = (idPropuesta: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasTI_A/propuestasAprobadas/${idPropuesta}`, { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}

export const addReviewTI = (data: ReviewModel ) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.post('/PropuestasTI_A/propuestasRevisionComite', data, { signal: controller.signal }),
    controller,
  }
}

export const aprovePropuestaTI = (idPropuesta: number, file: File, idComite: number) => {

  const controller = loadAbort();
  const data = {
    file,
    idComite,
    idPropuesta
  }

  return {
    call: axiosBackendAPI.put('/PropuestasTI_A/propuestas',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    controller,
  }
}