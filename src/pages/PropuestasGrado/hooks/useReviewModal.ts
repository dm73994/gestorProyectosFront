import {useState} from 'react';
import { useFetchAndLoad } from '../../../hooks';
import { ReviewModel, TipoPropuesta } from '..';
import { UserModel } from '../../../models';
import { useSelector } from 'react-redux';
import { addReviewTI } from '../../../services';
import Swal from 'sweetalert2';
import { AppStore } from '../../../redux/store';

export const useReviewModal = () => {
    
  const userState = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;
  const {callEndpoint} = useFetchAndLoad();
  const [openReview, setOpenReview] = useState(false);
  const [comment, setComment] = useState<string>('');

  const handleCloseReview = () => {
    setOpenReview(false);
  }
    
  const handleOpenReview = () => {
    setOpenReview(true);
  }

  const handleAddReview = async(idPropuesta: number, type: TipoPropuesta) => {
    const reviewData: ReviewModel = {
      identificacionComitePrograma: currentUser.id,
      idPropuestaTrabajoGrado: idPropuesta,
      comentariosRevisionComite: comment,
      estadoAvalRevisionComite: 0,
    }

    try{
      if(type === TipoPropuesta.TI){
        await callEndpoint(addReviewTI(reviewData));
      }
      Swal.fire({
        title: 'Revisión enviada',
        text: 'La revisión se ha enviado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      setComment('');
    }catch(err){
      console.log(err);
    }
  }


  return {
    handleOpenReview,
    handleCloseReview,
    handleAddReview,
    setComment,
    openReview
  }
}
