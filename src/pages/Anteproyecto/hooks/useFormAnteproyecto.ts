import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DetailsPropuesta } from '../../../models/Formatos/DetailsPropuesta.model';
import { AppStore } from '../../../redux/store';
import {  estadoPropuestaLabel, usePropuesta } from '../../PropuestasGrado';
import { AnteproyectoFormData, anteproyectoCreateSchema, defaultAnteproyectoValues } from '..';
import { validateForm } from '../../../utils';
import Swal from 'sweetalert2';
import { useFetchAndLoad } from '../../../hooks';
import { createAnteproyectoTIB as createAnteproyectoTI } from '../../../services/API/Anteproyexto/TI-B/AnteproyectoTI.service';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../..';
import { UserModel, UsersRoles } from '../../../models';
import { createAnteproyectoPPB as createAnteproyectoPP } from '../../../services/API/Anteproyexto/PP-B/AnteproyectoPP.service';

export const useFormAnteproyecto = (type: string) => {

  const { callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const { getUsersRol, usersList: coordinadoresList } = useUser();

  const userState = useSelector((state: AppStore) => state.user)
  const currentUser = userState.user;
  
  const [openAntepropuestas, setOpenAntepropuestas] = useState<boolean>(false);  
  const [openCodirectores, setOpenCodirectores] = useState<boolean>(false);
  const [propuestaData, setPropuestaData] = useState<DetailsPropuesta>(null); // DetailsPropuesta | null

  const propuestaHandler = usePropuesta({ type });

  const [formData, setFormData] = useState<AnteproyectoFormData>(defaultAnteproyectoValues);

  /**
  * Esta función 
  */

  const handleTitle = (title: string) => {
    setFormData({
      ...formData,
      titulo: title
    })
  }

  const handleSelectedPropuesta = (idPropuesta: number) => {
    const propuesta = propuestaHandler.propuestasUser.find((propuesta) => {
      return propuesta.idPropuesta === idPropuesta
    })
    
    setPropuestaData(propuesta);
    
    setFormData({
      ...formData,
      idPropuesta,
      estudiantes: propuesta.estudiantes.map((estudiante) => estudiante.id),
      idDirector: currentUser.id,
      idAsesor: propuesta.asistente.id,
      idCodirector: propuesta.codirector?.id
    })    
  }

  const handleDeletePropuesta = () => {
    setPropuestaData(null);
  }

  const handleChangePeriodo = (event: SelectChangeEvent) => {
    setFormData({
      ...formData,
      idAnteproyecto: parseInt(event.target.value)
    })
  };

  const handleUploadFile = (file: File) => {
    setFormData({
      ...formData,
      file: file
    })
  }

  const handleCodirector = async(codirector: UserModel) => {
    setPropuestaData({
      ...propuestaData,
      codirector
    })
    setFormData({
      ...formData,
      idCodirector: codirector.id
    })
  }

  const handleRemoveCodirector = () => {
    setPropuestaData({
      ...propuestaData,
      codirector: null
    })
    setFormData({
      ...formData,
      idCodirector: null
    })
  }

  const onSubmit = async() => {
    setFormData({
      ...formData,
    })
    const validation = validateForm(formData, anteproyectoCreateSchema);
    if(!validation) return;
    
    try{
      
      if(type === 'TI'){
        await callEndpoint(createAnteproyectoTI(formData));
      }else if(type === 'PP'){      
        await callEndpoint(createAnteproyectoPP(formData))
      }

      Swal.fire({
        icon: 'success',
        title: 'Anteproyecto creado',
        text: 'El anteproyecto se ha creado correctamente',
        confirmButtonText: 'Aceptar',
      })
        .then( () => {
          navigate('/anteproyectos/consult');
        })
      setFormData(defaultAnteproyectoValues);
    }catch(error){  
      console.log(error);
    }
  }

  /**
   * Cargamos loa propuestas avaladas al iniciar el componente
   */
  const loadCodirectoresForPossibleSelection = async() => {
    try{
      await getUsersRol(UsersRoles.DIRECTOR);
    }catch(err){
      throw new Error(err.message);
    }
  }
  useEffect(() => {
    loadCodirectoresForPossibleSelection();
    propuestaHandler.filterPropuestasByEstado(estadoPropuestaLabel.AVALADA); 
  }, [])



  return {
    propuestaHandler,
    currentUser,
    propuestaData,
    openAntepropuestas,
    openCodirectores,
    formData,
    coordinadoresList,
    handleSelectedPropuesta,
    handleChangePeriodo,
    handleDeletePropuesta,
    handleUploadFile,
    handleCodirector,
    handleTitle,
    setOpenAntepropuestas,
    onSubmit,
    setOpenCodirectores,
    getUsersRol,
    handleRemoveCodirector
  }
}
