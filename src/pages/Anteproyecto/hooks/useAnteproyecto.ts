import { useAnteproyectoTIB } from '../views/TI_B/hooks'
import { useAnteproyectoPPB } from '../views/PP_B/hooks';
import { IUseAnteproyectos } from '../schemas';

export const useAnteproyecto = (type: string): IUseAnteproyectos => {
  const tib = useAnteproyectoTIB();
  const ppb = useAnteproyectoPPB();

  if(type === 'TI'){
    return tib;
  }else if(type === 'PP'){
    return ppb;
  }

  return null;

}
