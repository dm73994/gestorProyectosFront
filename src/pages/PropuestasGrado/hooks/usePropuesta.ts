import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAndLoad } from '../../../hooks';
import { UserModel } from '../../../models';
import { AppStore } from '../../../redux/store';
import { downloadPropuestaAprovadaTI, downloadPropuestaTI, obtenerPropuestaTIById, obtenerPropuestasTIByDirector } from '../../../services/API/Propuestas/TI-A/PropuestasTI.service';
import { DetailsPropuesta } from '../../../models/Formatos/DetailsPropuesta.model';
import { PropuestasAdapter } from '../../../adapters';
import { useNavigate } from 'react-router-dom';
import { TipoPropuesta } from '..';

export const usePropuesta = () => {

  const {callEndpoint} = useFetchAndLoad();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  /**
   * Obtenemos el usuario actual del store de redux
   */
  const userState = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;
  const [propuestasUser, setPropuestasUser] = useState<DetailsPropuesta[]>([]);


  // Metodos para obtener la lista de propuestas usando diferentes filtros
  const getPrupuestasUsuario = async (idUsuario: number) => {
    try{
      const response = await callEndpoint(obtenerPropuestasTIByDirector(idUsuario));
      const formattedData: DetailsPropuesta[] = response.data.map( (resp) => PropuestasAdapter(resp, TipoPropuesta.TI) )
      setPropuestasUser(formattedData);
      return response;
    }catch(err){
      console.log(err);
    }
  }

  const getPropuestaById = async(id: number) => {
    try{
      setLoading(true);
      const response = await callEndpoint(obtenerPropuestaTIById(id));
      const formattedData: DetailsPropuesta =  PropuestasAdapter(response.data, TipoPropuesta.TI);
      
      setLoading(false);
      return formattedData;
    }catch(err){
      console.log(err);
    }
  }

  const handleDownload = async (id: number, name: string) => {
    try{
      const response = await callEndpoint(downloadPropuestaTI(id));
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `propuesta_${name}.docx`);
      document.body.appendChild(link);
      link.click();
    }catch(err){
      console.log(err);
    }
  }

  const handleDownloadAproved = async (id: number, name: string) => {
    try{
      const response = await callEndpoint(downloadPropuestaAprovadaTI(id));
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `propuestaAprovada_${name}.docx`);
      document.body.appendChild(link);
      link.click();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getPrupuestasUsuario(currentUser.id);
  }, [])


  return {
    currentUser,
    propuestasUser,
    getPropuestaById,
    navigation,
    loading,
    getPrupuestasUsuario,
    handleDownload,
    handleDownloadAproved
  }
}
