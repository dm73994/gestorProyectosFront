interface EstadoPropuesta {
    data: Record<1 | 0 | -1, string>;
}

const objEstadoPropuesta: EstadoPropuesta = {
  data: {
    1: 'Avalada',
    0: 'Revisión',
    '-1': 'Rechazada'
  }
}

export enum estadoPropuestaLabel {
  AVALADA = 1,
  REVISION = 0,
  RECHAZADA = -1
}

export const { data: estadosPropuesta } = objEstadoPropuesta;