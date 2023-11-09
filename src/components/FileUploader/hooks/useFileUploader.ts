import { useState } from 'react';
import { FileUploaderSchema } from '../schemas/FileUploaderSchema';
import Swal from 'sweetalert2';

export const useFileUploader = (uploadedFile, setUploadedFile) => {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file: File = new File([e.dataTransfer.files[0]], e.dataTransfer.files[0].name, { type: e.dataTransfer.files[0].type });
  
    // Validar cada archivo antes de agregarlo
    if( validationPromises(file) ){
      // Agregar los archivos al arreglo de archivos cargados
      setUploadedFile(file);
    }
  };
  
  const validationPromises = async (file: File) => {
    try{
      const correct = await FileUploaderSchema.validate({file: file})
      return correct;
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.errors.map( (error: string) => error).join(', ')
      });
      return false;
    }
  };
  

  return {
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    isDragging
  }
}
