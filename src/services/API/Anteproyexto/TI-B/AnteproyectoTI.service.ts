import { axiosBackendAPI } from '../../..'
import { AnteproyectoFormData } from '../../../../pages/Anteproyecto'
import { IReviewEvaluator } from '../../../../pages/Anteproyecto/components/AddReviewModal/hooks';
import { evaluatorsForm } from '../../../../pages/Anteproyecto/views/consult';
import { loadAbort } from '../../../../utils';


export const createAnteproyectoTIB = (data: AnteproyectoFormData) => {

  const rawData = {
    ...data,
    idEstudiante1: data.estudiantes[0],
    idEstudiante2: data.estudiantes[1] !== undefined ? data.estudiantes[1] : null,
  }
  delete rawData.estudiantes;

  return {
    call: axiosBackendAPI.post('AnteproyectoTI_B/', rawData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}

export const getAllAnteproyectosTIB = () => {
  return {
    call: axiosBackendAPI.get('AnteproyectoTI_B/')
  }
}

export const getAllAnteproyectosByDirectorTIB = (idDirector: number) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoTI_B/anteproyectosDirector/${idDirector}`)
  }
}

export const getAllAnteproyectosByEvaluadorTIB = (idEvaluador: number) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoTI_B/anteproyectosEvaluador/${idEvaluador}`)
  }
}

export const getAnteproyectoByIdTIB = (idAnteproyecto: string) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoTI_B/${idAnteproyecto}`)
  }
}

export const downloadAnteproyectoTIB = (idAnteproyecto: string, version: number) => {
  const controller = loadAbort();
  
  return {
    call: axiosBackendAPI.get(`AnteproyectoTI_B/anteproyectosSubidos/${idAnteproyecto}/${version}`, { signal: controller.signal, responseType: 'blob' }),
    controller
  }
}

export const addEvaluatorsAnteproyectoTIB = (data: evaluatorsForm) => {
  console.log('🚀 ~ file: AnteproyectoTI.service.ts:56 ~ addEvaluatorsAnteproyectoTIB ~ evaluatorsForm:', data)
  return {
    call: axiosBackendAPI.patch(`AnteproyectoTI_B/asignarEvaluadores?jefeDepartamento=${data.idJefedepartamento}&evaluador1=${data.evaluadores[0]}&evaluador2=${data.evaluadores[1]}&anteproyecto=${data.idAnteproyecto}`
    )
  }
}

export const addReviewTIB = (data: IReviewEvaluator) => {
  const format = {
    idRevision: data.idReview,
    idAnteproyecto: data.idAnteproyecto,
    idEvaluador: data.idEvaluator,
    conceptoRevision: data.concept,
    observaciones: data.comments,
    fileTI_B: data.reviewFile,
    fileAnteproyectoRevisado: data.annotationsFiles
  }
  console.log('🚀 ~ file: AnteproyectoTI.service.ts:73 ~ addReviewTIB ~ format:', format)
  return {
    call: axiosBackendAPI.put('AnteproyectoTI_B/revision', format, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}

export const addNewVersionAnteproyectoTIB = (idAnteproyecto: string, file: File) => {
  return {
    call: axiosBackendAPI.patch('AnteproyectoTI_B/anteproyectosNuevo', {idAnteproyecto, file}, {headers: { 'Content-Type': 'multipart/form-data' }})
  }
}