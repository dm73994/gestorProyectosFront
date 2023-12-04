import { TipoPropuestaBrief } from '../schemas/TipoPropuesta';
import { IUsePropuestas } from '../schemas/UsePropuestaInterface';
import { usePropuestasPPA } from '../views/PPA';
import { usePropuestasTIA } from '../views/TIA/hooks/usePropuestaTIA';

export const usePropuesta = ({type}: {type: 'TI' | 'PP' | string}): IUsePropuestas => {

  const tia = usePropuestasTIA();
  const ppa = usePropuestasPPA(); 

  if(type === TipoPropuestaBrief.TIA) return tia;
  else if(type === TipoPropuestaBrief.PPA) return ppa;
  
  return null
}
