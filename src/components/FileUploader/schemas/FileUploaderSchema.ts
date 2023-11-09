import * as yup from 'yup';

export const FileUploaderSchema = yup.object().shape({
  file: yup.mixed().required('Debe seleccionar un archivo').test(
    'fileSize',
    'El archivo es demasiado grande',
    (value: File | null) => (value ? value.size <= 1024 * 1024 : true) // 1 MB
  ).test(
    'fileType',
    'Tipo de archivo no válido',
    (value: File | null) =>
      value ? ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(value.type) : true
  ),
}).required();