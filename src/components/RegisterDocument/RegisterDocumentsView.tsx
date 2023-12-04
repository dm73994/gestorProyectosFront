import { ArrowBack, BiotechSharp, EngineeringSharp } from '@mui/icons-material';
import { CardContent, Box, Typography, Button } from '@mui/material';
import { CustomDivider, CustomButton } from '..';
import { StyledCard } from '../../styled-components';
import { useState } from 'react';

interface IRegisterDocumentsProps {
  title: string;
  children: React.ReactNode;
  textButtonOne: string;
  textButtonTwo: string;
  handleButtonOne: () => void;
  handleButtonTwo: () => void;
}

export const RegistrerDocumentsView = ({
  title,
  children,
  textButtonOne,
  textButtonTwo,
  handleButtonOne,
  handleButtonTwo,
}: IRegisterDocumentsProps) => {

  const [step, setStep] = useState(1);

  return (
    <StyledCard>
  
      <CardContent>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Typography textAlign={'center'} textTransform={'uppercase'}> {title} </Typography>
  
          { step === 2 && (
            <Button 
              onClick={() => setStep(1)} 
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
              onClick={() => {
                handleButtonOne()
                setStep(2)
              }}
              text={textButtonOne}
              startIcon={<BiotechSharp />}
            />
            <CustomButton 
              onClick={() => {
                handleButtonTwo()
                setStep(2)
              }}
              text={textButtonTwo}
              startIcon={<EngineeringSharp />}
            />
          </Box>
        )}
          
        {step === 2 && (
          <Box paddingX={10}>
            {children}
          </Box>
        )}
  
      </CardContent>
  
    </StyledCard>
  );
};
  