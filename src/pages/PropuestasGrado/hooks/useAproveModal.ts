import {useState} from 'react';
import { ReviewModel, TipoPropuesta } from '..';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useFetchAndLoad } from '../../../hooks';
import { UserModel } from '../../../models';
import { AppStore } from '../../../redux/store';
import { addReviewTI, aprovePropuestaTI } from '../../../services';

export const useAproveModal = () => {

  const userState = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;
  const {callEndpoint} = useFetchAndLoad();

  const [openAprove, setOpenAprove] = useState(false);
  const [data, setData] = useState({
    comment: '',
    aproveFile: null
  });

  const handleAprovePropuesta = async(propuestaId: number, type: TipoPropuesta) => {
    const reviewData: ReviewModel = {
      identificacionComitePrograma: currentUser.id,
      idPropuestaTrabajoGrado: propuestaId,
      comentariosRevisionComite: data.comment,
      estadoAvalRevisionComite: 1,
    }
    
    try{
      if(type === TipoPropuesta.TI){
        await callEndpoint(addReviewTI(reviewData));
        await callEndpoint(aprovePropuestaTI(propuestaId, data.aproveFile, currentUser.id));
      }
      Swal.fire({
        title: 'PROPUESTA AVALADA',
        text: 'La propuesta ha sido avalada exitosamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      handleAddComment('');
    }catch(err){
      console.log(err);
    }
  }

  const handleCloseAprove = () => {
    setOpenAprove(false);
  }
    
  const handleOpenAprove = () => {
    setOpenAprove(true);
  }

  const handleAddComment = (comment: string) => {
    setData({...data, comment});
  }

  const handleAddAproveFile = (aproveFile: File) => {
    setData({...data, aproveFile});
  }

      
  return {
    handleCloseAprove,
    handleOpenAprove,
    handleAprovePropuesta,
    handleAddComment,
    handleAddAproveFile,
    openAprove,
    data
  }
}
