import { DetailsReviewModel } from '../pages/PropuestasGrado/schemas/Review.model'
import { UserAdapter } from '.';

export const ReviewAdapter = (review: any) => {

  const formattedData: DetailsReviewModel = {
    comentariosRevisionComite: review.comentariosRevisionComite,
    estadoAvalRevisionComite: review.estadoAvalRevisionComite,
    fechaRespuesta: new Date(review.fechaRespuesta),
    identificacionComitePrograma: UserAdapter(review.identificacionComitePrograma),
    idRevisionComite: review.idRevisionComite
  }

  return formattedData;
}
