import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnteproyectoAdapter } from '../../../../../adapters/Anteproyecto.adapter';
import { useFetchAndLoad } from '../../../../../hooks';
import { AuthInteface, UserModel, DetailsAnteproyecto, AnteproyectoType } from '../../../../../models';
import { AppStore } from '../../../../../redux/store';
import { getAllAnteproyectosPPB, getAllAnteproyectosByDirectorPPB, getAllAnteproyectosByEvaluadorPPB, getAnteproyectoByIdPPB, downloadAnteproyectoPPB } from '../../../../../services/API/Anteproyexto';
import { IUseAnteproyectos } from '../../../schemas'

export const useAnteproyectoPPB = (): IUseAnteproyectos => {
  const navigate = useNavigate();
  const {callEndpoint, loading} = useFetchAndLoad();

  const userState: AuthInteface = useSelector( (state: AppStore) => state.user )
  const currentUser: UserModel = userState.user

  const [anteproyectos, setAnteproyectos] = useState<DetailsAnteproyecto[]>([])
  

  const loadUserAnteproyectos = async() => {
    if(currentUser.permissions.anteproyecto.viewAll){
      const response = await callEndpoint( getAllAnteproyectosPPB() )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.PP_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewOwner){
      const response = await callEndpoint( getAllAnteproyectosByDirectorPPB(currentUser.id) )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.PP_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewEvaluator){
      const response = await callEndpoint( getAllAnteproyectosByEvaluadorPPB(currentUser.id) )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.PP_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewAccepted){ /* empty */ }
  }

  const loadAnteproyectoById = async(idAnteproyecto: string) => {
    try{
      const response =  await callEndpoint( getAnteproyectoByIdPPB(idAnteproyecto) )
      const formatted = AnteproyectoAdapter(response.data, AnteproyectoType.PP_B);
      return formatted;
    }catch(error){ 
      console.error(error);
      return null;
    }
  }

  const consultFormatA = (idPropuesta: number) => {
    navigate(`/propuestas/view/PP/${idPropuesta}`)
  }

  const canAproveAnteproyecto = (anteproyecto: DetailsAnteproyecto): boolean => {
    return false;
  }

  const handleNavigation = (idAnteproyecto: string) => {
    const id = idAnteproyecto.toString().replace('.', '-');
    navigate(`/anteproyectos/view/PP/${id}`)
  }

  const handleDownloadAnteproyecto = async(anteproyecto: DetailsAnteproyecto) => {
    try{
      const response = await callEndpoint(downloadAnteproyectoPPB(anteproyecto.id, anteproyecto.version));
      const url: string = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${anteproyecto.title}_${anteproyecto.estudiantes[0].username}_V${anteproyecto.version}.docx`);
      document.body.appendChild(link);
      link.click();
    }catch(err){
      console.log(err);
    }
  }


  /**
   * Load all anteproyectos at the start of the component
   */
  useEffect(() => {
    loadUserAnteproyectos();
  }, [])

  return {
    loading,
    currentUser,
    anteproyectos,
    loadUserAnteproyectos,
    loadAnteproyectoById,
    canAproveAnteproyecto,
    handleNavigation,
    handleDownloadAnteproyecto,
    consultFormatA
  }
}
