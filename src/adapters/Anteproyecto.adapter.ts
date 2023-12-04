import { DetailsAnteproyectoReview, UserModel } from '../models';
import { AnteproyectoType, DetailsAnteproyecto } from '../models/Formatos/DetailsAnteproyecto.model'
import { getFileName } from '../utils/getFileName';
import { UserAdapter } from './User.adapter';

export const AnteproyectoAdapter = (anteproyecto: any, type: AnteproyectoType): DetailsAnteproyecto => {
  
  if(type === AnteproyectoType.TI_B) return _adaptTIB(anteproyecto);
  
  else if(type === AnteproyectoType.PP_B) return _adaptPPB(anteproyecto);
  
  return null;
} 


const _adaptTIB = (anteproyecto: any): DetailsAnteproyecto => {

  const estudiantes: UserModel[] = [];
  const estudiante2 = UserAdapter(anteproyecto.identificacionEstudiante2TIB);
  estudiantes.push(UserAdapter(anteproyecto.identificacionEstudiante1TIB));
  if(estudiante2) estudiantes.push(estudiante2);

  const versionesRealizadas = [];
  const v1 = getFileName(anteproyecto.rutaAnteproyectoTIBV1);
  const v2 = getFileName(anteproyecto.rutaAnteproyectoTIBV2);
  const v3 = getFileName(anteproyecto.rutaAnteproyectoTIBV3);

  /**
   * Agregamos los documentos de las versiones realizada
   * de no existir agregamos null para completar el vector de documentos de revision
   */
  versionesRealizadas.push(v1 != '' ? v1 : null);
  versionesRealizadas.push(v2 != '' ? v3 : null);
  versionesRealizadas.push(v3 != '' ? v3 : null);


  const reviews: DetailsAnteproyectoReview[] = [null, null, null];
  anteproyecto.revisiones.forEach((revision: any, index: number) => {

    const docReview1 = getFileName(revision.identificacionEvaluador1.rutaRespuesta);
    const evaluador1 = revision.identificacionEvaluador1 !== null && {
      concept: revision.identificacionEvaluador1.conceptoRevision,
      conceptDate: new Date(revision.identificacionEvaluador1.fechaConcepto),
      notes: revision.identificacionEvaluador1.observaciones,
      reviewFile: docReview1,
      observationsFile: getFileName(revision.identificacionEvaluador1.rutaAnteproyectoRevisado),
      creationDate: new Date(revision.identificacionEvaluador1.fechaAsignacion),
      evaluator: UserAdapter(revision.identificacionEvaluador1.identificacionEvaluador),
      complete: docReview1 !== '',
    };

    const docReview2 = getFileName(revision.identificacionEvaluador2.rutaRespuesta);
    const evaluador2 = revision.identificacionEvaluador2 !== null && {
      concept: revision.identificacionEvaluador2.conceptoRevision,
      conceptDate: new Date(revision.identificacionEvaluador2.fechaConcepto),
      notes: revision.identificacionEvaluador2.observaciones,
      reviewFile: docReview2,
      observationsFile: getFileName(revision.identificacionEvaluador2.rutaAnteproyectoRevisado),
      creationDate: new Date(revision.identificacionEvaluador2.fechaAsignacion),
      evaluator: UserAdapter(revision.identificacionEvaluador2.identificacionEvaluador),
      complete: docReview2 !== '',
    };
    
    const review: DetailsAnteproyectoReview = ({
      id: revision.idRevision,
      evaluacion1: evaluador1,
      evaluacion2: evaluador2,
    });

    reviews[index] = review;
  });




  const formattedData: DetailsAnteproyecto = {
    id: anteproyecto.idAnteProyectoTIB,
    title: anteproyecto.tituloAnteproyecto,
    idPropuesta: anteproyecto.idPropuestaTIA.idPropuestaTrabajoGradoTIA,
    filePropuesta: getFileName(anteproyecto.idPropuestaTIA.rutaPropuestaTrabajoGrado),
    director: UserAdapter(anteproyecto.identificacionDirectorTIB),
    estudiantes: estudiantes,
    codirector: UserAdapter(anteproyecto.identificacionCodirector),
    date: new Date(anteproyecto.fechaRecepcionAnteproyectoTIB),
    versions: versionesRealizadas,
    reviews: reviews,
    ti_C: anteproyecto.rutaFormatoTI_C,
    state: anteproyecto.estado,
    version: anteproyecto.nversion,
    type: AnteproyectoType.TI_B,
    asesor: null
  }
    
  return formattedData;
}

const _adaptPPB = (anteproyecto: any): DetailsAnteproyecto => {
  console.log('🚀 ~ file: Anteproyecto.adapter.ts:81 ~ anteproyecto:', anteproyecto)

  const estudiantes: UserModel[] = [UserAdapter(anteproyecto.identificacionEstudiantePPB)];

  const versionesRealizadas = [];
  versionesRealizadas.push(getFileName(anteproyecto.rutaAnteproyectoPPBV1));
  versionesRealizadas.push(getFileName(anteproyecto.rutaAnteproyectoPPBV2));
  versionesRealizadas.push(getFileName(anteproyecto.rutaAnteproyectoPPBV3));


  const reviews: DetailsAnteproyectoReview[] = [];
  anteproyecto.revisiones.forEach((revision: any) => {

    const evaluador1 = revision.identificacionEvaluador1 !== null && {
      concept: revision.identificacionEvaluador1.conceptoRevision,
      conceptDate: new Date(revision.identificacionEvaluador1.fechaConcepto),
      notes: revision.identificacionEvaluador1.observaciones,
      reviewFile: getFileName(revision.identificacionEvaluador1.rutaRespuesta),
      observationsFile: getFileName(revision.identificacionEvaluador1.rutaAnteproyectoRevisado),
      creationDate: new Date(revision.identificacionEvaluador1.fechaAsignacion),
      evaluator: UserAdapter(revision.identificacionEvaluador1.identificacionEvaluador),
      complete: false,
    };

    const evaluador2 = revision.identificacionEvaluador2 !== null && {
      concept: revision.identificacionEvaluador2.conceptoRevision,
      conceptDate: new Date(revision.identificacionEvaluador2.fechaConcepto),
      notes: revision.identificacionEvaluador2.observaciones,
      reviewFile: getFileName(revision.identificacionEvaluador2.rutaRespuesta),
      observationsFile: getFileName(revision.identificacionEvaluador2.rutaAnteproyectoRevisado),
      creationDate: new Date(revision.identificacionEvaluador2.fechaAsignacion),
      evaluator: UserAdapter(revision.identificacionEvaluador2.identificacionEvaluador),
      complete: false,
    };
    
    reviews.push({
      id: revision.idRevision,
      evaluacion1: evaluador1,
      evaluacion2: evaluador2,
    });
  });


  const formattedData: DetailsAnteproyecto = {
    id: anteproyecto.idAnteProyectoPPB,
    title: anteproyecto.tituloAnteproyecto,
    idPropuesta: anteproyecto.idPropuestaPPA.idPropuestaTrabajoGradoPPA,
    filePropuesta: getFileName(anteproyecto.idPropuestaPPA.rutaPropuestaTrabajoGrado),
    director: UserAdapter(anteproyecto.identificacionDirectorPPB),
    estudiantes: estudiantes,
    codirector: UserAdapter(anteproyecto.identificacionCodirector),
    date: new Date(anteproyecto.fechaRecepcionAnteproyectoPPB),
    versions: versionesRealizadas,
    reviews: reviews,
    ti_C: anteproyecto.rutaFormatoPP_C,
    state: anteproyecto.estado,
    version: anteproyecto.nversion,
    type: AnteproyectoType.PP_B,
    asesor: UserAdapter(anteproyecto.idPropuestaPPA.identificacionAsesorPPA),
  }
    
  return formattedData;
}