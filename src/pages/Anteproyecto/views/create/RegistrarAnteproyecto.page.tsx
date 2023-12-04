import { Box } from '@mui/material'
import React from 'react'
import { RegistrerDocumentsView } from '../../../../components'
import { FormAnteproyecto } from '.'

const RegistrarAnteproyectoPage = () => {

  const [format, setFormat] = React.useState<'TI' | 'PP'>('TI');

  return (
    <Box>
      <RegistrerDocumentsView 
        title={'Registrar Anteproyecto (FORMATO B)'} 
        textButtonOne={'Anteproyecto investigación'} 
        textButtonTwo={'Anteproyecto práctica profesional'} 
        handleButtonOne={() => setFormat('TI')} 
        handleButtonTwo={() => setFormat('PP')} 
      >
        <FormAnteproyecto format={format}  />
      </RegistrerDocumentsView>
    </Box>
  )
}

export default RegistrarAnteproyectoPage