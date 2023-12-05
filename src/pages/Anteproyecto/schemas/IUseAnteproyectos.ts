/* eslint-disable no-unused-vars */
import { DetailsAnteproyecto } from '../../../models/Formatos/DetailsAnteproyecto.model';
import { UserModel } from '../../../models/user/User.model';
export interface IUseAnteproyectos {
    loading: boolean;
    currentUser: UserModel;
    anteproyectos: DetailsAnteproyecto[];
    loadUserAnteproyectos: () => void;
    loadAnteproyectoById: (idAnteproyecto: string) => Promise<DetailsAnteproyecto>;
    canAproveAnteproyecto: (anteproyecto: DetailsAnteproyecto) => boolean;
    handleNavigation: (idAnteproyecto: string) => void;
    consultFormatA: (idPropuesta: number) => void;
    handleDownloadAnteproyecto: (idAnteproyecto: DetailsAnteproyecto) => void;
    canAddEvaluators: (anteproyecto: DetailsAnteproyecto) => boolean;
    canAddReview: (anteproyecto: DetailsAnteproyecto) => boolean;
}
