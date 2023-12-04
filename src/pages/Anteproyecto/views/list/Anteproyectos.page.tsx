import React, { useState } from 'react'
import { CardHeader, Box, Typography, FormControl, RadioGroup, FormControlLabel, Divider } from '@mui/material';
import { CustomDivider } from '../../../../components';
import { StyledCard, StyledRadio } from '../../../../styled-components';
import { TipoPropuesta } from '../../../PropuestasGrado';
import { AnteproyectosTIB } from '../TI_B';
import { AnteproyectosPPB } from '../PP_B';
import { FormatosLabel } from '../../../../models';

const AnteproyectosPage = () => {
  const [value, setValue] = useState<TipoPropuesta>(TipoPropuesta.TI);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt((event.target as HTMLInputElement).value);
    setValue(value);
  };

  return (
    <>
      <StyledCard sx={{ pl: 10, pr: 10, pb: 10 }}>

        <CardHeader
          title='Lista de anteproyectos de grado'
          subheader=''
          sx={{ textAlign: 'center' }} />
        <CustomDivider />
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography> Mostrar anteproyectos de: </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel value={TipoPropuesta.TI} control={<StyledRadio  />} label={FormatosLabel.TI} />
                <FormControlLabel value={TipoPropuesta.PP} control={<StyledRadio />} label={FormatosLabel.PP} />
              </RadioGroup>
            </FormControl>
          </Box>

        </Box>

        <Divider sx={{ mb: 2, mt: 2 }} />

        {value === TipoPropuesta.TI && (
          <AnteproyectosTIB />
        )}

        {value === TipoPropuesta.PP && (
          <AnteproyectosPPB />
        )}


    
      </StyledCard>
    
    </>
  )
}

export default AnteproyectosPage