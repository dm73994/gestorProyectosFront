import { ReviewAdapter } from '.';
import { UserModel } from '../models';
import { DetailsPropuesta } from '../models/Formatos/DetailsPropuesta.model';
import { TipoPropuesta } from '../pages/PropuestasGrado';
import { UserAdapter } from './User.adapter';
import { getFileName } from '../utils/getFileName';

export const PropuestasAdapter = (propuesta: any, tipo: TipoPropuesta): DetailsPropuesta => {

  if(tipo === TipoPropuesta.TI){
    return adaptTI(propuesta);
  }else if(tipo === TipoPropuesta.PP){
    return  adaptPP(propuesta);
  }

  return null;
}

const adaptTI = (propuesta: any) => {
  const director: UserModel = UserAdapter(propuesta.identificacionDirectorTIA);
  const codirector: UserModel = UserAdapter(propuesta.identificacionCodirectorTIA)
  
  const estudiantes: UserModel[] = [];
  estudiantes.push(UserAdapter(propuesta.identificacionEstudiante1TIA))
  const segundo = UserAdapter(propuesta.identificacionEstudiante2TIA);
  if(segundo) estudiantes.push(segundo);

  const fileName: string = getFileName(propuesta.rutaPropuestaTrabajoGrado)
  const aprovedDoc: string = getFileName(propuesta.rutaRespuestaPropuestaTrabajoGrado);

  const formattedData: DetailsPropuesta = {
    idPropuesta: propuesta.idPropuestaTrabajoGradoTIA,
    title: propuesta.tituloPropuestaTrabajoGrado,
    director,
    codirector,
    asistente: null,
    estudiantes,
    date: new Date(propuesta.fechaSubidoPropuestaTrabajoGrado),
    revisiones: propuesta.revisiones.map( review => ReviewAdapter(review) ),
    fileName: fileName,
    type: TipoPropuesta.TI,
    avalado: propuesta.rutaRespuestaPropuestaTrabajoGrado == null ? null : aprovedDoc,
  }

  return formattedData;
}


const adaptPP = (propuesta: any) => {
  const director: UserModel = UserAdapter(propuesta.identificacionDirectorPPA);
  const codirector: UserModel = UserAdapter(propuesta.identificacionCodirectorPPA)
  const asistente: UserModel = UserAdapter(propuesta.identificacionAsesorPPA)
  
  const estudiantes: UserModel[] = [ UserAdapter(propuesta.identificacionEstudiantePPA) ];

  const fileName: string = String(propuesta.rutaPropuestaTrabajoGrado).split('\\').pop()
  const aprovedDoc: string = String(propuesta.rutaRespuestaPropuestaTrabajoGrado).split('\\').pop()

  const formattedData: DetailsPropuesta = {
    idPropuesta: propuesta.idPropuestaTrabajoGradoPPA,
    title: propuesta.tituloPropuestaTrabajoGrado,
    director,
    codirector,
    asistente: asistente,
    estudiantes,
    date: new Date(propuesta.fechaSubidoPropuestaTrabajoGrado),
    revisiones: propuesta.revisiones.map( review => ReviewAdapter(review) ),
    fileName: fileName,
    type: TipoPropuesta.PP,
    avalado: propuesta.rutaRespuestaPropuestaTrabajoGrado == null ? null : aprovedDoc,
  }

  return formattedData;
}