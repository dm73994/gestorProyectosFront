import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAndLoad } from '../../../../../hooks';
import { AuthInteface, UserModel } from '../../../../../models';
import { AppStore } from '../../../../../redux/store';
import { addReviewPPB } from '../../../../../services/API/Anteproyexto';
import { validateModalForm } from '../../../../../utils';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';


export interface IReviewEvaluator {
  idReview: number;
  idEvaluator: number,
  idAnteproyecto: string,
  concept: string,
  comments: string,
  reviewFile: File,
  annotationsFiles?: File;
}

export const reviewSchema = yup.object<IReviewEvaluator>().shape({
  idEvaluator: yup.number().required(),
  idAnteproyecto: yup.string().required(),
  concept: yup.string().required(),
  comments: yup.string().required(),
  reviewFile: yup.mixed().required(),
})

export const initialReview: IReviewEvaluator = {
  idReview: null,
  idEvaluator: null,
  idAnteproyecto: null,
  concept: null,
  comments: null,
  reviewFile: null,
  annotationsFiles: null,
}


export const useAddReviewAnteproyecto = () => {
  const {id} = useParams();
  const formatedId = String(id).replace('-', '.');
  const {callEndpoint} = useFetchAndLoad();
  const userState: AuthInteface = useSelector((state: AppStore) => state.user);
  const currentUser: UserModel = userState.user;
  
  const [data, setData] = useState<IReviewEvaluator>({
    ...initialReview, 
    idEvaluator: currentUser.id,
    idAnteproyecto: formatedId,
    concept: 'En revision'
  })
  
  const [errors, setErrors] = useState()
  
  
  /**
  * Agregar comentario
  */
  const handleComentario = (comment: string) => {
    setData({
      ...data,
      comments: comment
    })
  }
  
  /**
  * ADJUNTAR DOCUMENTO
  */
  const handleUploadReviewFile = (file: File) => {
    setData({
      ...data,
      reviewFile: file
    })
  }
  /**
  * ADJUNTAR DOCUMENTO
  */
  const handleUploadAnnotationsFiles = (file: File) => {
    setData({
      ...data,
      annotationsFiles: file
    })
  }
  
  /**
  * AGREGAR REVISION
  */
  const handleAddReview = async(version: number) => {
    try{
      setData({
        ...data,
        idReview: version
      })
      const validate = await validateModalForm(data, reviewSchema);
      if( validate.error ) {
        setErrors(validate.message);
        return;
      }
      await callEndpoint(addReviewPPB(data));
    }catch(error) {
      console.log('🚀 ~ file: ConsultAnteproyecto.page.tsx:60 ~ handleAddReview ~ error', error)
    }
  }


  return {
    data,
    errors,
    handleComentario,
    handleUploadReviewFile,
    handleUploadAnnotationsFiles,
    handleAddReview
  }
}
