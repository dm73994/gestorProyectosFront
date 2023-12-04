import { Drawer, Typography } from '@mui/material';
import React from 'react'
import { CustomDivider } from '..';

interface CustomDrawerProps {
    children: React.ReactNode;
    title: string;
    open: boolean;
    toggleDrawer: () => void;
}

export const CustomDrawer = ({ children, title, open, toggleDrawer }: CustomDrawerProps) => {

  return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        variant: 'elevation',
        sx: {
          bgcolor: '#fff',
          width: '40vw',
          padding: '2rem'
        }
      }}
    >
      <Typography textTransform={'uppercase'} fontWeight={'bold'} sx={{ mb: 2, textAlign: 'center' }}> {title} </Typography>
      <CustomDivider />
      {children}
    </Drawer>
  )
}
