import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useUser } from '../..';
import { useFetchAndLoad } from '../../../hooks';
import { UserModel, PropuestaModel, PropuestaModelBackend } from '../../../models';
import { AppStore } from '../../../redux/store';
import { createPropuestaTI, downloadTemplateTI } from '../../../services/API/Propuestas/TI-A/PropuestasTI.service';
import { TipoPropuesta } from '../schemas/TipoPropuesta';
import { createPropuestaPP, downloadTemplatePP } from '../../../services';
import { PropuestaFormData, propuestaSchema } from '..';

export const useFormPropuesta = () => {

  const {callEndpoint} = useFetchAndLoad();

  /**
   * Obtenemos el usuario actual del store de redux
   */
  const userState = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;

  /**
   * Creamos el tipo de propuesta
   * 0: Trabajo de investigación
   * 1: Pasantía profesional
   */
  const [type, setType] = useState<TipoPropuesta>(TipoPropuesta.TI);

  /**
   * Se asigna currentUser como director por defecto
   * y se inicializa el estado de la propuesta
   */
  const [dataPropuesta, setDataPropuesta] = useState<PropuestaModel>({
    title: '',
    director: currentUser,
    estudiantes: [],
    file: null,
    asistente: undefined,
  });

  const handleAddCodirector = (codirector: UserModel) => {
    setDataPropuesta({
      ...dataPropuesta,
      codirector: codirector
    });
    
  }
  
  const handleAddAsistente = (asistente: UserModel) => {
    setDataPropuesta({
      ...dataPropuesta,
      asistente: asistente
    });
  }
  
  const handleAddEstudiante = (estudiante: UserModel) => {
    setDataPropuesta({
      ...dataPropuesta,
      estudiantes: [...dataPropuesta.estudiantes, estudiante]
    });

  }

  const handleRemoveAsistente = () => {
    setDataPropuesta({
      ...dataPropuesta,
      asistente: undefined
    });
  }

  const handleRemoveEstudiante = (estudiante: UserModel) => {
    setDataPropuesta({
      ...dataPropuesta,
      estudiantes: dataPropuesta.estudiantes.filter(e => e.id !== estudiante.id)
    });
  }

  const handleRemoveCodirector = () => {
    setDataPropuesta({
      ...dataPropuesta,
      codirector: undefined
    });
  }

  const handleUpdateFile = (file: File) => {
    setDataPropuesta({
      ...dataPropuesta,
      file: file
    });
  }

  const handleTitleChange = (title: string) => {
    setDataPropuesta({
      ...dataPropuesta,
      title: title
    });
  }

  const onSubmit = async(type: TipoPropuesta) => {
    
    try{
      const data: PropuestaFormData = {
        title: dataPropuesta.title,
        director: dataPropuesta.director.id,
        estudiantes: dataPropuesta.estudiantes.map( est => est.id ),
        doc: dataPropuesta.file as File,
      }

      const errors: boolean = await validationForm(data);

      if(!errors) return false;

      const formattedData: PropuestaModelBackend = {
        title: dataPropuesta.title,
        idDirector: dataPropuesta.director.id,
        idCodirector: dataPropuesta.codirector?.id,
        idAsistente: dataPropuesta.asistente?.id,
        estudiantes: dataPropuesta.estudiantes.map(e => e.id),
        file: dataPropuesta.file as File,
      }

      let response;

      if(type === TipoPropuesta.TI){
        response = await callEndpoint(createPropuestaTI(formattedData))
      }else{
        response = await callEndpoint(createPropuestaPP(formattedData))
      }

      Swal.fire({
        icon: 'success',
        title: `Propuesta ${response.data.tituloPropuestaTrabajoGrado} registrada con éxito`,
        showConfirmButton: false,
        timer: 1500
      })

      setStep(1);

    }catch(err){
      console.log(err);
    }
  }

  const validationForm = async (data: PropuestaFormData) => {
    try{
      await propuestaSchema.validate(data, {abortEarly: false})
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


  /**
   * FUNCIONES PARA EL PROCESO DE SELECCION Y DESCARGA DE PLATILLA DE PROPUESTAS
   */
  const [ step, setStep ] = useState(1);

  const handleStep = (step: number) => {
    setStep(step);
  }

  const handleDownload = async(type: TipoPropuesta) => {
    switch (type) {
    case TipoPropuesta.TI: {
      const response = await callEndpoint(downloadTemplateTI());
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      
      // Crea un enlace temporal para iniciar la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Plantilla_Formato_TI-A.docx'; // Establece el nombre del archivo aquí
      a.style.display = 'none';
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Libera los recursos
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      break;
    }
    case TipoPropuesta.PP: {
      const response = await callEndpoint(downloadTemplatePP());
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      
      // Crea un enlace temporal para iniciar la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Plantilla_Formato_PP-A.docx'; // Establece el nombre del archivo aquí
      a.style.display = 'none';
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Libera los recursos
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      break;
    }

    default:
      break;
    }
  }

  const handleTI = () => {
    Swal.fire({
      title: '¿Desea descargar la plantilla de formato TI_A?',
      text: 'Este formato es obligatorio para registrar una propuesta de trabajo de investigación.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Continuar sin descargar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Descargar',
      allowOutsideClick: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) handleDownload(TipoPropuesta.TI)
      handleStep(2);
      setType(TipoPropuesta.TI);
    })
  }

  const handlePP = () => {
    Swal.fire({
      title: '¿Desea descargar la plantilla de formato PP_A?',
      text: 'Este formato es obligatorio para registrar una propuesta de pasatía profesional?.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Continuar sin descargar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Descargar'
    }).then((result) => {
      if (result.isConfirmed) handleDownload(TipoPropuesta.PP)
      setType(TipoPropuesta.PP);
      handleStep(2);
    })
  }

  /**
   * Obtenemos la lista de usuarios para el select de 
   * estudiantes, director, codirector y asistente
   */
  const {
    usersList,
    getUsersRol,
  } = useUser(); 

  return {
    currentUser,
    dataPropuesta,
    setDataPropuesta,
    usersList,
    setType,
    type,
    getUsersRol,
    handleAddCodirector,
    handleAddAsistente,
    handleAddEstudiante,
    handleRemoveCodirector,
    handleRemoveAsistente,
    handleRemoveEstudiante,
    handleUpdateFile,
    handleTitleChange,
    onSubmit,
    step,
    handleStep,
    handleTI,
    handlePP,
  }
}
