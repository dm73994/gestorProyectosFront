import { RoleModel, UserModel, permissionsModel } from '../models'

const initialRoles: permissionsModel = {
  user: {
    edit: false,
    add: false,
    consult: false,
    view: false,
    active: false,
  },
  role: {
    edit: false,
    add: false,
    consult: false,
    view: false
  },
  propuesta: {
    add: false,
    viewAll: false,
    viewOwner: false,
    download: false,
    aprove: false,
    review: false,
  },
  anteproyecto: {
    addAnteproyecto: false,
    addVersion: false,
    addReview: false,
    addEvaluator: false,    
    download: false,    
    viewReviews: false,
    viewAll: false,
    viewOwner: false,
    viewEvaluator: false,    
    aprove: false,
    reject: false,
    viewAccepted: false,
  }
}

export const UserAdapter = (superUser: any): UserModel => {

  if(superUser === null) return null; 

  const roles: RoleModel[] = superUser.roles.map((rol: any) => {
    return {
      id: rol.codigoRol,
      type: rol.tipoRol,
      state: undefined
    }
  });

  const formattedUser: UserModel = {
    id: superUser.identificacionUsuario,
    name: superUser.nombresUsuario,
    lastname: superUser.apellidosUsuario,
    username: superUser.loginUsuario.userNameLogin,
    token: '',
    state: superUser.estadoUsuario === 1 ? true : false,
    email: superUser.emailUsuario,
    roles,
    permissions: initialRoles
  }
    
  return formattedUser
}