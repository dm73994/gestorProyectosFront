import * as yup from 'yup';
export type PropuestaFormData = {
  title: string;
  director: number;
  estudiantes: number[];
}


export const propuestaSchema = yup.object<PropuestaFormData>().shape({
  title: yup.string().min(10, 'El título debe tener al menos 10 letras').required('Debe escribir el título de la propuesta'),
  director: yup.number().required('Debe seleccionar un director'),
  estudiantes: yup.array()
    .of(yup.number())
    .min(1, 'Debe seleccionar al menos un estudiante')
    .required('El estudiante es requerido'),
}).required();

export const defaultPropuestaValues = {
  title: '',
  director: null,
  estudiantes: [],
}