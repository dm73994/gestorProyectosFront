import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

export const useRoles = () => {
    
  const {roles} = useSelector((state: AppStore) => state.roles)

  return {
    roles
  }
}
