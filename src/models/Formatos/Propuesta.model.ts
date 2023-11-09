import { UserModel } from '..';

export interface PropuestaModel {
    title: string;
    director: UserModel; // id del director
    codirector?: UserModel; // id del codirector
    asistente: UserModel; // nomber o correo del asistente
    estudiantes: UserModel[]; // id de los estudiantes
    file: File | null;
}

export interface PropuestaModelBackend {
    title: string;
    idDirector: number;
    idCodirector?: number;
    idAsistente?: number;
    estudiantes: number[];
    file: File;
}