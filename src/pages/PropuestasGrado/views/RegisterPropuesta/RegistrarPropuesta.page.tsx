import { RegistrerDocumentsView } from '../../../../components';
import { FormPropuesta, TipoPropuestaLabel, useFormPropuesta } from '../..';

const RegistrarPropuestaPage = () => {

  const { type, handlePP, handleTI } = useFormPropuesta();

  return (
    <RegistrerDocumentsView 
      title='REGISTRO DE PROPUESTA (FORMATO A)'
      textButtonOne={TipoPropuestaLabel.TI}
      textButtonTwo={TipoPropuestaLabel.PP}
      handleButtonOne={handleTI}
      handleButtonTwo={handlePP}
    >
      <FormPropuesta type={type} />
    </RegistrerDocumentsView>

  );
};


export default RegistrarPropuestaPage