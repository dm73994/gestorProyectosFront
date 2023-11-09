import { Box, Typography, Avatar } from '@mui/material'
import React from 'react'

interface IUserBrief {
    title: string,
    name: string,
    username: string
}

export const UserBrief = ({ title, name, username }: IUserBrief) => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} >
      <Typography variant='caption' textTransform={'uppercase'}> {title} </Typography>
      <Avatar variant='rounded' sx={{ bgcolor: 'primary.main' }} />
      <Typography variant='caption'> {name} </Typography>
      <Typography variant='caption' sx={{ color: 'text.disabled' }}> @{username} </Typography>
    </Box>
  )
}
