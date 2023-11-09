import { ArrowBack, BiotechSharp, EngineeringSharp } from '@mui/icons-material';
import { Box, Button, CardContent, Typography } from '@mui/material';
import { StyledCard } from '../../../styled-components';
import { CustomButton, CustomDivider } from '../../../components';
import { FormPropuesta, useFormPropuesta } from '..';




const RegistrarPropuestaPage = () => {

  const { type, step, handlePP, handleStep, handleTI } = useFormPropuesta();

  return (
    <StyledCard>

      <CardContent>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Typography textAlign={'center'}> REGISTRO DE PROPUESTA </Typography>

          { step === 2 && (
            <Button 
              onClick={() => handleStep(1)} 
              sx={{ position: 'absolute', top: -5, left: 0 }} 
              startIcon={<ArrowBack />}
              color='error'
            >
              Volver
            </Button>
          )}
        </Box>

        <CustomDivider />

        {step === 1 && (
          <Box display={'flex'} gap={5} paddingX={20}>
            <CustomButton 
              onClick={handleTI}
              text='TRABAJO DE INVESTIGACIÓN'
              startIcon={<BiotechSharp />}
            />
            <CustomButton 
              onClick={handlePP}
              text='pasantía profesional'
              startIcon={<EngineeringSharp />}
            />
          </Box>
        )}
        
        {step === 2 && (
          <Box paddingX={10}>
            <FormPropuesta type={type} />
          </Box>
        )}

      </CardContent>

    </StyledCard>
  );
};


export default RegistrarPropuestaPage