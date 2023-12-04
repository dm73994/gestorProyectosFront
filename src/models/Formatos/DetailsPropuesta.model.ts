import { UserModel } from '..'
import { DetailsReviewModel, TipoPropuesta } from '../../pages/PropuestasGrado'

export type DetailsPropuesta = {
  idPropuesta: number,
  title: string,
  director: UserModel,
  codirector: UserModel,
  asistente: UserModel,
  estudiantes: UserModel[],
  date: Date,
  revisiones: DetailsReviewModel[],
  fileName: string,
  type: TipoPropuesta,
  avalado: string | undefined,
}