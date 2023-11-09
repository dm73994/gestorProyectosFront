import { Cancel, Person } from '@mui/icons-material'
import { CardContent, Avatar, Box, Typography, IconButton } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { StyledCard } from '../../styled-components'
import { UserModel } from '../../models/user/User.model';

interface ILittleUserCardProps {
    user: UserModel,
    title: string,
    isDelete?: boolean,
    handleDelete?: () => void,
    color?: any
}

export const LittleUserCard = ({user, title, isDelete = false, handleDelete, color}: ILittleUserCardProps) => {
  return (
    <StyledCard sx={{ bgcolor: color ? color : blue[100], position: 'relative' }} >

      {isDelete && (
        <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleDelete}>
          <Cancel color='error' />
        </IconButton>
      )}

      <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 4 }} >
        <Avatar sx={{ width: 64, height: 64 }}>
          <Person sx={{ width: 54, height: 54 }} />
        </Avatar>
        <Box sx={{ color: '#000' }} >
          <Typography fontWeight={'bold'} > {title} </Typography>
          <Typography><span style={{ fontWeight: 'bold' }} >Nombre:</span> {user?.name}</Typography>
          <Typography><span style={{ fontWeight: 'bold' }} >Contacto:</span> {user?.email}</Typography>
          <Typography><span style={{ fontWeight: 'bold' }} >Usuario:</span> {user?.username}</Typography>
        </Box>
      </CardContent>
    </StyledCard>
  )
}
