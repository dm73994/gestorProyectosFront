import { useReducer} from 'react'
import { Provider } from 'react-redux';
import { NavigationContext } from './NavigationContex';
import { NavigationReducer } from '.';
import { NavigationActionReducerModel } from '../../models';

export const NavigationProvider = ({children}) => {
  const [navbarState, navbarDispatch] = useReducer(NavigationReducer, {open: false});

  const openMenu = () => {
    navbarDispatch({type: NavigationActionReducerModel.open});
  }

  const closeMenu = () => {
    navbarDispatch({type: NavigationActionReducerModel.close});
  }

  const handleMenu = () => {
    navbarState.open ? closeMenu() : openMenu();
  }

  return (
    <NavigationContext.Provider value={ {isOpen: navbarState.open, openMenu, closeMenu, handleMenu} }>
      {children}
    </NavigationContext.Provider>
  )
}
