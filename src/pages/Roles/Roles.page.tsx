import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, styled, Container, Grid, CardContent } from '@mui/material';
import { useRoles } from './hooks/useRoles';
import { StyledCard } from '../../styled-components';
import { theme } from '../../services';

const StyledRadio = styled(Radio, {shouldForwardProp: (prop) => prop !== 'text'} )<{text: string}>(({ theme, text }) => ({
  color: '#1976d2',
  width: 'auto',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.customs.dark}`,
  '&::after': {
    content: `"${text}"`,
    display: 'block', /* Opcional, para que el texto aparezca en una línea nueva */
    fontSize: '14px',
    color: '#000',
    fontWeight: 'bold',
  },
  '&.Mui-checked': {
    background: `${theme.palette.customs.dark}`,
    color: '#fff'
  },
  '&.Mui-checked::after': {
    color: '#fff'
  }
}))

const RolesPage = () => {
  const {
    roles
  } = useRoles();

  return (
    <Container>

      <Grid container spacing={2}>
        <Grid item md={12} sm={6}>
          <StyledCard>
            <CardContent>
              <FormControl>
                <FormLabel sx={{ color: theme.palette.customs.contrastText }} >Seleccione un rol</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ display: 'flex' }}
                >
                  {roles.map( role => (
                    <FormControlLabel
                      key={role.id}
                      value={role.id}
                      label={''}
                      control={<StyledRadio text={role.type} />}
                    />
                  ))}
                                
                </RadioGroup>
              </FormControl>
            </CardContent>
          </StyledCard>

        </Grid>

        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent>
                                Listado
            </CardContent>
          </StyledCard>
        </Grid>
                        
      </Grid>

            

    </Container>
  )
}

export default RolesPage;
