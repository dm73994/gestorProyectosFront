/* eslint-disable no-unused-vars */
import { UserModel } from '../../../models';
import { DetailsPropuesta } from '../../../models/Formatos/DetailsPropuesta.model';

export interface IUsePropuestas {
    currentUser: UserModel;
    propuestasUser: DetailsPropuesta[];
    loading: boolean;
    getPrupuestasUsuario: () => Promise<void>;
    getAllPropuestas: () => Promise<DetailsPropuesta[]>;
    getPropuestasByUser: (idUsuario: number) => Promise<DetailsPropuesta[]>;
    filterPropuestasByEstado: (estado: number) => Promise<void>;
    consultPropuestaById: (id: number) => Promise<DetailsPropuesta>;
    handleDownload: (id: number, name: string) => Promise<void>;
    handleDownloadAproved: (id: number, name: string) => Promise<void>;
    handleConsultNavigation: (id: number) => void;
  }