import * as yup from 'yup';


export type AnteproyectoFormData = {
    titulo: string;
    idAnteproyecto: number;
    idPropuesta: number;
    idDirector: number;
    estudiantes: number[];
    file: File;
    idCodirector?: number;
    idAsesor?: number;
}
  

export const anteproyectoCreateSchema = yup.object<AnteproyectoFormData>().shape({
  titulo: yup.string().min(10, 'El título debe tener al menos 10 letras').required('Debe escribir el título de la propuesta'),

  idAnteproyecto: yup.number().min(1, 'Debe seleccionar un periodo valido').max(2, 'Debe seleccionar un periodo valido').required('Debe seleccionar un periodo'),
  idPropuesta: yup.number().required('Debe seleccionar una propuesta'),
  idDirector: yup.number().required('Debe seleccionar un director'),
  estudiantes: yup.array()
    .of(yup.number())
    .min(1, 'Debe seleccionar al menos un estudiante')
    .max(2, 'Solo puede seleccionar dos estudiantes')
    .required('El estudiante es requerido'),
  file: yup.mixed().required('Debe adjuntar el documento de la propuesta'),
})

export const defaultAnteproyectoValues: AnteproyectoFormData = {
  titulo: '',
  idAnteproyecto: -1,
  idPropuesta: null,
  idDirector: null,
  idCodirector: null,
  estudiantes: [],
  file: null,
  idAsesor: null,
}