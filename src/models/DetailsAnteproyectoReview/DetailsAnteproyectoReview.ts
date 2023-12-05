import { UserModel } from '..';

export interface DetailsAnteproyectoReview {
    id: number;
    evaluacion1: evaluation;
    evaluacion2: evaluation;
}

export interface evaluation {
    concept: string;
    conceptDate: Date;
    notes: string;
    reviewFile: string;
    observationsFile: string;
    creationDate: Date;
    evaluator: UserModel;
    complete: boolean;
    id: number;
}