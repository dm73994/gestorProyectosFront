import { NavigationActionReducerModel, initialNavbarState } from "../../models";

const initialState: initialNavbarState = {
    open: false
}

export const NavigationReducer = ( state = initialState, action ) => {
    switch(action.type){
        case NavigationActionReducerModel.open:
            return {
                ...state,
                open: true,
            };
        
        case NavigationActionReducerModel.close:
            return {
                ...state,
                open: false,
            };

        default: 
            return state;
    }
}