import { ModalBox, StyledCard, StyledRadio } from '../../../../styled-components'
import { DetailsPropuesta } from '../../../../models/Formatos/DetailsPropuesta.model';
import { Modal, Typography, Box, Button, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { ListPropuestaItem } from '../../../PropuestasGrado/components/ListPropuestaItem';
import { CustomDivider } from '../../../../components';
import { useState } from 'react';

interface IModalTableProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    propuestasList: DetailsPropuesta[];
    setSelectedPropuesta: any;
}

export const SelectPropuestasList = ({ open, setOpen, propuestasList, setSelectedPropuesta }: IModalTableProps) => {

  const [value, setValue] = useState<number>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt((event.target as HTMLInputElement).value);
    setValue(value);
  };

  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    setSelectedPropuesta(value);
    setOpen(false);
  }
 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            Seleccione una propuesta
        </Typography>

        <CustomDivider />

        <Typography>
            La propuesta (Formato A) seleccionada será asignada como referencia para el anteproyecto (Formato B)
        </Typography>

        <FormControl>
          <RadioGroup
            value={value}
            onChange={handleChange}
          >
            <StyledCard sx={{ padding: '2rem 1rem', mt: 2, width: '70vw' }}>
              {propuestasList.map((propuesta) => (
                <Box key={propuesta.idPropuesta} sx={{ display: 'flex' }}>
                  <FormControlLabel value={propuesta.idPropuesta} control={<StyledRadio />} label={''}/>
                  <ListPropuestaItem 
                    propuesta={propuesta}
                    handleConsultNavigation={() => {}}
                    forSelection
                  />
                </Box>
              ))}
            </StyledCard>
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, mt: 2 }} >
          <Button variant='contained' color='error' onClick={handleClose}>
              Cancelar
          </Button>
          <Button variant='contained' color='info' onClick={handleAccept}>
              Aceptar
          </Button>
        </Box>

      </ModalBox>
    </Modal>
  )
}
