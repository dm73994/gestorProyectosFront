import Swal from 'sweetalert2';
import * as yup from 'yup';

export const validateForm = async (data: object, schema: yup.AnyObjectSchema) => {
  try{
    await schema.validate(data, {abortEarly: false})
    return true;
  }catch(err){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.errors.map( (error: string) => '*' + error + '\n')
    });
    return false;
  }
};

export const validateModalForm = async (data: object, schema: yup.AnyObjectSchema) => {
  try{
    await schema.validate(data, {abortEarly: false})
    return {
      error: false,
      message: null
    };
  }catch(err){
    
    return {
      error: true,
      message: err.inner.map( (error) => {  
        return {
          element: error.path,
          error: error.errors
        }
      })
    };
  }
};
