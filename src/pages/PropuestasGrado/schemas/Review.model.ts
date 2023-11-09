import { UserModel } from '../../../models';

export interface ReviewModel {
    identificacionComitePrograma: number,
    idPropuestaTrabajoGrado: number,
    comentariosRevisionComite: string,
    estadoAvalRevisionComite: number,
}

export interface DetailsReviewModel {
    comentariosRevisionComite: string,
    estadoAvalRevisionComite: number,
    fechaRespuesta: Date,
    identificacionComitePrograma: UserModel,
    idRevisionComite: number
}