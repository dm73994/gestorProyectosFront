/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from 'react-redux';
import { filterUserAuthorizationByRoles } from '../../../../../utils';
import { UserModel, UsersRoles } from '../../../../../models';
import { useFetchAndLoad } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DetailsPropuesta } from '../../../../../models/Formatos/DetailsPropuesta.model';
import { AppStore } from '../../../../../redux/store';
import { downloadPropuestaAprovadaPP, downloadPropuestaPP, obtenerPropuestaPPById, obtenerPropuestasPP, obtenerPropuestasPPByDirector, obtenerPropuestasPPByDirectorYEstado, obtenerPropuestasPPByEstado } from '../../../../../services';
import { PropuestasAdapter } from '../../../../../adapters';
import { TipoPropuesta } from '../../..';
import { IUsePropuestas } from '../../../schemas/UsePropuestaInterface';


export const usePropuestasPPA = (): IUsePropuestas => {

  const navigation = useNavigate();
  const {callEndpoint} = useFetchAndLoad();
  const [loading, setLoading ] = useState(true);
  /**
   * Obtenemos el usuario actual del store de redux
   */
  const userState = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;
  const [propuestasUser, setPropuestasUser] = useState<DetailsPropuesta[]>([]);
  const validate = filterUserAuthorizationByRoles(currentUser, [UsersRoles.COMITE, UsersRoles.COORDINADOR, UsersRoles.ADMIN]);


  // Metodos para obtener la lista de propuestas usando diferentes filtros
  const getPrupuestasUsuario = async () => {    
    if(validate){
      const data = await getAllPropuestas();
      setPropuestasUser(data);
      return;
    }
    const data = await getPropuestasByUser(currentUser.id);
    setPropuestasUser(data);
  }

  const getAllPropuestas = async ()=>  {
    try{
      setLoading(true);
      // Obtenemos las propuestas de trabajo de investigacion
      const responsePP = await callEndpoint(obtenerPropuestasPP());
      const formattedDataTI: DetailsPropuesta[] = responsePP.data.map( (resp) => PropuestasAdapter(resp, TipoPropuesta.PP) )
      
      setLoading(false);
      return formattedDataTI;
    }catch(err){
      console.log(err);
      return []
    }
  }

  const getPropuestasByUser = async (idUsuario: number) => {
    try{
      setLoading(true);
      // Obtenemos las propuestas de trabajo de investigacion
      const responsePP = await callEndpoint(obtenerPropuestasPPByDirector(idUsuario));
      const formattedDataPP: DetailsPropuesta[] = responsePP.data.map( (resp) => PropuestasAdapter(resp, TipoPropuesta.PP) )

      setLoading(false);
      return formattedDataPP;
    }catch(err){
      console.log(err);
      return []
    }
  }

  const filterPropuestasByEstado = async (estado: number) => {
    if(validate){
      const data = await _filterAllByEstado(estado);
      setPropuestasUser(data);
      return;
    }
    const data = await _filterAllByDirector(estado);
    setPropuestasUser(data);
  }

  const _filterAllByEstado = async (estado: number) => {
    try{
      setLoading(true);
      // Obtenemos las propuestas de trabajo de investigacion
      const responseTI = await callEndpoint(obtenerPropuestasPPByEstado(estado));
      const formattedDataTI: DetailsPropuesta[] = responseTI.data.map( (resp) => PropuestasAdapter(resp, TipoPropuesta.PP) )

      setLoading(false);
      return formattedDataTI;
    }catch(err){
      console.log(err);
      return []
    }
  }

  const _filterAllByDirector = async (estado: number) => {
    try{
      setLoading(true);
      // Obtenemos las propuestas de trabajo de investigacion
      const responseTI = await callEndpoint(obtenerPropuestasPPByDirectorYEstado(currentUser.id, estado));
      const formattedDataTI: DetailsPropuesta[] = responseTI.data.map( (resp) => PropuestasAdapter(resp, TipoPropuesta.PP) )

      setLoading(false);
      return formattedDataTI;
    }catch(err){
      console.log(err);
      return []
    }
  }

  const consultPropuestaById = async(id: number) => {
    try{
      setLoading(true);

      const responseTI = await callEndpoint(obtenerPropuestaPPById(id));
      const formattedData: DetailsPropuesta =  PropuestasAdapter(responseTI.data, TipoPropuesta.PP);
      
      setLoading(false);
      return formattedData;
    }catch(err){
      console.log(err);
    }
  }

  const handleDownload = async (id: number, name: string) => {
    try{
      const response = await callEndpoint(downloadPropuestaPP(id));
      const url: string = window.URL.createObjectURL(new Blob([response.data]));

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
      const response = await callEndpoint(downloadPropuestaAprovadaPP(id));
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

  const handleConsultNavigation = (id: number) => {
    navigation(`/propuestas/view/PP/${id}`, { replace: true })
  }

  return {
    currentUser,
    propuestasUser,
    loading,
    getPrupuestasUsuario,
    getAllPropuestas,
    getPropuestasByUser,
    consultPropuestaById,
    handleDownload,
    handleDownloadAproved,
    handleConsultNavigation,
    //FILTROS
    filterPropuestasByEstado
    
  }
}
