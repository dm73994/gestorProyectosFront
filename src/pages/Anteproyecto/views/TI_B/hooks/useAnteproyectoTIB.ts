import { useSelector } from 'react-redux'
import { IUseAnteproyectos } from '../../../schemas'
import { AppStore } from '../../../../../redux/store'
import { downloadAnteproyectoTIB, getAllAnteproyectosTIB, getAllAnteproyectosByDirectorTIB, getAllAnteproyectosByEvaluadorTIB, getAnteproyectoByIdTIB } from '../../../../../services/API/Anteproyexto/TI-B/AnteproyectoTI.service';
import { AuthInteface, DetailsAnteproyectoReview, UserModel, evaluation } from '../../../../../models';
import { useFetchAndLoad } from '../../../../../hooks';
import { AnteproyectoAdapter } from '../../../../../adapters/Anteproyecto.adapter';
import { AnteproyectoType, DetailsAnteproyecto } from '../../../../../models/Formatos/DetailsAnteproyecto.model';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAnteproyectoTIB = (): IUseAnteproyectos => {

  const navigate = useNavigate();
  const {callEndpoint, loading} = useFetchAndLoad();

  const userState: AuthInteface = useSelector( (state: AppStore) => state.user )
  const currentUser: UserModel = userState.user

  const [anteproyectos, setAnteproyectos] = useState<DetailsAnteproyecto[]>([])
  

  const loadUserAnteproyectos = async() => {
    if(currentUser.permissions.anteproyecto.viewAll){
      const response = await callEndpoint( getAllAnteproyectosTIB() )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.TI_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewOwner){
      const response = await callEndpoint( getAllAnteproyectosByDirectorTIB(currentUser.id) )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.TI_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewEvaluator){
      const response = await callEndpoint( getAllAnteproyectosByEvaluadorTIB(currentUser.id) )
      const formattedData = response.data.map( anteproyecto => AnteproyectoAdapter(anteproyecto, AnteproyectoType.TI_B) )
      setAnteproyectos(formattedData);
      return;
    }

    if(currentUser.permissions.anteproyecto.viewAccepted){ /* empty */ }
  }

  const loadAnteproyectoById = async(idAnteproyecto: string) => {
    try{
      const response =  await callEndpoint( getAnteproyectoByIdTIB(idAnteproyecto) )
      const formatted = AnteproyectoAdapter(response.data, AnteproyectoType.TI_B);
      return formatted;
    }catch(error){ 
      console.error(error);
      return null;
    }
  }

  const consultFormatA = (idPropuesta: number) => {
    navigate(`/propuestas/view/TI/${idPropuesta}`)
  }

  const canAproveAnteproyecto = (anteproyecto: DetailsAnteproyecto): boolean => {
    return false;
  }

  /**
   * 
   * @param anteproyecto 
   * @returns boolean
   * @description Validar cuando el evaluador una vez realizada su labor descartiva en base a eso
   * la acción para agregar revisión
   */
  const canAddReview = (anteproyecto: DetailsAnteproyecto):boolean => {

    if(currentUser.permissions.anteproyecto.addReview === false) return false;

    const version: number = anteproyecto.version - 1;
    if(anteproyecto.reviews[version] === null) return false;

    const evaluacion: evaluation = anteproyecto.reviews[version].evaluacion1.evaluator.id === currentUser.id
      ? anteproyecto.reviews[version].evaluacion1
      : anteproyecto.reviews[version].evaluacion2
                              
    return !evaluacion.complete;
  }


  enum ENUMCONCEPTO {
    REVISION = 'En revision',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado'
  }
  /**
   * @param anteproyecto 
   * @returns boolean
   * @description 
   * Evalua el tipo de usuario, debe ser jefe de departamento, luego
   * Se debe verificar el anteproyecto consultado, esto con el fin de
   * obtener las revisiones, que por defecto son un array nulo de 3 [null, null, null]
   * en caso de enccontrar esto se habilita la opción de agregar evaluadores,
   * una vez hecho esto el array queda [revision, null, null]
   * la revision tendra un estado "complete" el cual se usa para verifica el estado de la revision
   * se el estado es verdadero quiere decir que la evaluacion a sido finalizada y se procede a verificar
   * el estado de concepto, el cual se usa para verificar que la revisión ha sido completa, o se debe devolver el documento para 
   * una nueva revision lo cual habilitaría el boton de asignación de nuevos evaluadores para la siguiente revisión
   */
  const canAddEvaluators = (anteproyecto: DetailsAnteproyecto): boolean => {

    if(currentUser.permissions.anteproyecto.addEvaluator === false) return false;

    const version: number =  anteproyecto.version - 1;

    const revision: DetailsAnteproyectoReview = anteproyecto.reviews[version];
    console.log('🚀 ~ file: useAnteproyectoTIB.ts:119 ~ canAddEvaluators ~ revision:', revision)
    if(revision === null) return true;

    const conceptoR1: string = revision.evaluacion1.concept;
    const conceptoR2: string = revision.evaluacion2.concept;


    if(revision.evaluacion1.complete === false || revision.evaluacion2.complete === false) {
      return false;
    }
    else if(revision.evaluacion1.complete && revision.evaluacion2.complete){
      return true;
    }

    if( (conceptoR1 || conceptoR2) === ENUMCONCEPTO.APROBADO ){
      return false;
    }

    return false;
  }

  const handleNavigation = (idAnteproyecto: string) => {
    const id = idAnteproyecto.toString().replace('.', '-');
    navigate(`/anteproyectos/view/TI/${id}`)
  }

  const handleDownloadAnteproyecto = async(anteproyecto: DetailsAnteproyecto) => {
    try{
      const response = await callEndpoint(downloadAnteproyectoTIB(anteproyecto.id, anteproyecto.version));
      const url: string = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${anteproyecto.title}_${anteproyecto.estudiantes[0].username}_V${anteproyecto.version}.docx`);
      document.body.appendChild(link);
      link.click();
    }catch(err){
      console.log(err);
    }
  }


  /**
   * Load all anteproyectos at the start of the component
   */
  useEffect(() => {
    loadUserAnteproyectos();
  }, [])

  return {
    loading,
    currentUser,
    anteproyectos,
    loadUserAnteproyectos,
    loadAnteproyectoById,
    canAproveAnteproyecto,
    handleNavigation,
    handleDownloadAnteproyecto,
    consultFormatA,
    canAddEvaluators,
    canAddReview
  }
}
