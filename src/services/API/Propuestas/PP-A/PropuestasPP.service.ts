import { axiosBackendAPI } from '../../..';
import { PropuestaModelBackend } from '../../../../models';
import { ReviewModel } from '../../../../pages/PropuestasGrado';
import { loadAbort } from '../../../../utils';

export const downloadTemplatePP = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/plantillas/PP-A', { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}


export const createPropuestaPP = (propuesta: PropuestaModelBackend) => {
  const controller = loadAbort();

  const data = {
    titulo: propuesta.title,
    idDirector: propuesta.idDirector,
    idEstudiante: propuesta.estudiantes[0],
    idCodirector: propuesta.idCodirector ? propuesta.idCodirector : 0,
    idAsesor: propuesta.idAsistente ? propuesta.idAsistente : 0,        
    file: propuesta.file,
  }
  
  return {
    call: axiosBackendAPI.post('/PropuestasPP_A/propuestas', 
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


export const obtenerPropuestasPPByDirector = (idDirector: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/PropuestasPP_A/propuestasDirector',
      {
        signal: controller.signal, 
        params: {idDirector}
      }
    ),
    controller,
  };
}

export const obtenerPropuestasPPByDirectorYEstado = (idDirector: number, estado: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasPP_A/propuestasDirector/estado/${estado}`,
      {
        signal: controller.signal, 
        params: {idDirector}
      }
    ),
    controller,
  };
}

export const obtenerPropuestasPPByEstado = (estado: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasPP_A/propuestas/estado/${estado}`,
      {
        signal: controller.signal, 
      }
    ),
    controller,
  };
}

export const obtenerPropuestasPP = () => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get('/PropuestasPP_A/propuestas',{signal: controller.signal, }
    ),
    controller,
  };
}

export const obtenerPropuestaPPById = (id: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasPP_A/propuestas/${id}`,
      {
        signal: controller.signal, 
      }
    ),
    controller,
  };
}

export const downloadPropuestaPP = (idPropuesta: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasPP_A/propuestasSubidas/${idPropuesta}`, { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}

export const downloadPropuestaAprovadaPP = (idPropuesta: number) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.get(`/PropuestasPP_A/propuestasAprobadas/${idPropuesta}`, { signal: controller.signal, responseType: 'blob' }),
    controller,
  }
}

export const addReviewPP = (data: ReviewModel ) => {
  const controller = loadAbort();
  return {
    call: axiosBackendAPI.post('/PropuestasPP_A/propuestasRevisionComite', data, { signal: controller.signal }),
    controller,
  }
}

export const aprovePropuestaPP = (idPropuesta: number, file: File, idComite: number) => {

  const controller = loadAbort();
  const data = {
    file,
    idComite,
    idPropuesta
  }

  return {
    call: axiosBackendAPI.put('/PropuestasPP_A/propuestas',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    controller,
  }
}