import { CloseSharp } from '@mui/icons-material'
import { Modal, Typography, Box, IconButton, Grid } from '@mui/material'
import React from 'react'
import { CustomDivider, CustomButton } from '../../../../components'
import { StyledCard } from '../../../../styled-components'

interface IProps {
    title: string;
    description: string;
}

interface ICustomModal {
    open: boolean;
    children: React.ReactNode;
    props: IProps;
    handleClose: () => void;
    successFunction: () => void;
}

export const CustomModal = ({open, children, props, handleClose, successFunction}: ICustomModal) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledCard sx={{ 
        width: '80vw', 
        height: '90vh',     
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        paddingTop: '1rem',
        overflowY: 'auto', 
      }}>

        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '100%' }} >

          <Grid item xs={12} sx={{ }}>
            <Typography variant='h6' textAlign={'center'} sx={{ flexGrow: 3 }}> {props.title} </Typography>
    
            <Box display={'flex'} gap={4} justifyContent={'center'} sx={{ position: 'absolute', top: 10, right: 10 }}>
              <IconButton onClick={handleClose}>
                <CloseSharp />
              </IconButton>
            </Box>
            
            <CustomDivider />
          </Grid>

          <Grid item xs={12} sx={{ }}>
            <Typography variant='body2'> {props.description} </Typography>
          </Grid>

          <Grid item xs={12}>
            {children}
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Box display={'flex'} gap={4}>
              <CustomButton text='Cancelar' color='error.main' onClick={handleClose} />
              <CustomButton 
                text='Aceptar' 
                color='success.main' 
                onClick={successFunction} 
              />
            </Box>
          </Grid>

        </Grid>

      </StyledCard>
    </Modal>
  )
}
