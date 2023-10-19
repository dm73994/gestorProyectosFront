import { Email } from '@mui/icons-material'
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

interface Props {
    label: string;
    data: string;
    icon?: React.ReactNode; 
}

export const InfoText = ({label, data, icon}: Props) => {
  return (
    <>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
            <Typography variant="overline" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }} >
                {icon}
                {label}
            </Typography>
            <Typography variant="subtitle2" pl={4}>
                {data}
            </Typography>
        </Box>
        {/* <Divider /> */}
    </>
  )
}
