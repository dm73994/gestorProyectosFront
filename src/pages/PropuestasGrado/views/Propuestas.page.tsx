import { Box, CardHeader, Divider, FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import { StyledCard, StyledRadio} from '../../../styled-components'
import { CustomDivider } from '../../../components'
import { useState } from 'react';
import { TipoPropuesta, TipoPropuestaLabel} from '..';
import { PropuestasTIA } from './TIA/PropuestasTIA';
import { PropuestasPPA } from './PPA';


const PropuestasPage = () => {

  const [value, setValue] = useState<TipoPropuesta>(TipoPropuesta.TI);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt((event.target as HTMLInputElement).value);
    setValue(value);
  };

  return (
    <>
      <StyledCard sx={{ pl: 10, pr: 10, pb: 10 }}>

        <CardHeader
          title='Lista de propuestas de grado'
          subheader=''
          sx={{ textAlign: 'center' }} />
        <CustomDivider />
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography> Mostrar propuestas de: </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel value={TipoPropuesta.TI} control={<StyledRadio  />} label={TipoPropuestaLabel.TI} />
                <FormControlLabel value={TipoPropuesta.PP} control={<StyledRadio />} label={TipoPropuestaLabel.PP} />
              </RadioGroup>
            </FormControl>
          </Box>

        </Box>

        <Divider sx={{ mb: 2, mt: 2 }} />

        {value === TipoPropuesta.TI && (
          <PropuestasTIA />
        )}

        {value === TipoPropuesta.PP && (
          <PropuestasPPA />
        )}


    
      </StyledCard>
    
    </>
  )
}

export default PropuestasPage