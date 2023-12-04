import { NotificationsModel } from '../models'

export const NotificationsAdapter = (notification: any) => {

  const formattedData: NotificationsModel = {
    id: notification.idNotificaciones,
    emisor: {
      name: notification.usuarioEmisor.nombresUsuario,
      email: notification.usuarioEmisor.emailUsuario,
    },
    message: notification.mensaje,
    date: new Date(notification.fecha).toLocaleDateString()
  }

  return formattedData;
}
