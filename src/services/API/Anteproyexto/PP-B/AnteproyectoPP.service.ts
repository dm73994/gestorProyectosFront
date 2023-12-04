import { axiosBackendAPI } from '../../..';
import { AnteproyectoFormData } from '../../../../pages/Anteproyecto';
import { IReviewEvaluator } from '../../../../pages/Anteproyecto/components/AddReviewModal/hooks';
import { evaluatorsForm } from '../../../../pages/Anteproyecto/views/consult';
import { loadAbort } from '../../../../utils';

export const createAnteproyectoPPB = (data: AnteproyectoFormData) => {

  const rawData = {
    ...data,
    idEstudiante: data.estudiantes[0],
  }
  delete rawData.estudiantes;
  
  return {
    call: axiosBackendAPI.post('AnteproyectoPP_B/', rawData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}
  
export const getAllAnteproyectosPPB = () => {
  return {
    call: axiosBackendAPI.get('AnteproyectoPP_B/')
  }
}
  
export const getAllAnteproyectosByDirectorPPB = (idDirector: number) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoPP_B/anteproyectosDirector/${idDirector}`)
  }
}
  
export const getAllAnteproyectosByEvaluadorPPB = (idEvaluador: number) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoPP_B/anteproyectosEvaluador/${idEvaluador}`)
  }
}
  
export const getAnteproyectoByIdPPB = (idAnteproyecto: string) => {
  return {
    call: axiosBackendAPI.get(`AnteproyectoPP_B/${idAnteproyecto}`)
  }
}
  
export const downloadAnteproyectoPPB = (idAnteproyecto: string, version: number) => {
  const controller = loadAbort();
    
  return {
    call: axiosBackendAPI.get(`AnteproyectoPP_B/anteproyectosSubidos/${idAnteproyecto}/${version}`, { signal: controller.signal, responseType: 'blob' }),
    controller
  }
}
  
export const addEvaluatorsAnteproyectoPPB = (data: evaluatorsForm) => {
  return {
    call: axiosBackendAPI.patch(`AnteproyectoPP_B/asignarEvaluadores?jefeDepartamento=${data.idJefedepartamento}&evaluador1=${data.evaluadores[0]}&evaluador2=${data.evaluadores[1]}&anteproyecto=${data.idAnteproyecto}`
    )
  }
}
  
export const addReviewPPB = (data: IReviewEvaluator) => {
  const format = {
    idRevision: data.idReview,
    idAnteproyecto: data.idAnteproyecto,
    idEvaluador: data.idEvaluator,
    conceptoRevision: data.concept,
    observaciones: data.comments,
    filePP_B: data.reviewFile,
    fileAnteproyectoRevisado: data.annotationsFiles
  }
  return {
    call: axiosBackendAPI.put('AnteproyectoPP_B/revision', format, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}
  
export const addNewVersionAnteproyectoPPB = (idAnteproyecto: string, file: File) => {
  return {
    call: axiosBackendAPI.patch('AnteproyectoPP_B/anteproyectosNuevo', {idAnteproyecto, file}, {headers: { 'Content-Type': 'multipart/form-data' }})
  }
}