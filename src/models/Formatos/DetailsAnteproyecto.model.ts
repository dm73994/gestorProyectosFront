import { DetailsAnteproyectoReview, UserModel } from '..';

export interface DetailsAnteproyecto {
    id: string;
    title: string;
    idPropuesta: number;
    filePropuesta: string;
    director: UserModel;
    estudiantes: UserModel[];
    codirector: UserModel;
    asesor: UserModel;
    date: Date;
    versions: string[];
    reviews: DetailsAnteproyectoReview[];
    ti_C: string;
    state: string;
    version: number;
    type: AnteproyectoType;
}

export enum AnteproyectoType {
    TI_B = 'TI_B',
    PP_B = 'PP_B',
}