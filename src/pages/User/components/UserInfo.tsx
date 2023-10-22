import { Email, Circle, ManageAccounts, BadgeOutlined } from '@mui/icons-material'
import { CardContent, Box, Avatar, Typography, Divider, Badge } from '@mui/material'
import { deepPurple, green, red } from '@mui/material/colors'
import React from 'react'
import { InfoText } from '..'
import { getInitialsName } from '../../../utils'
import { UserModel } from '../../../models'

interface IUserInfoProps {
    user: UserModel;
}

export const UserInfo = ({user}: IUserInfoProps) => {
  return (
    <CardContent>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Avatar alt="Image" sx={{ width: '7rem', height: '7rem', bgcolor: deepPurple[500] }} > {getInitialsName(user.name, user.lastname)} </Avatar>
            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'center'}>
                {user.name} {user.lastname}
            </Typography>
            <Typography variant="caption" textAlign={'center'}>
                @{user.username}
            </Typography>
        </Box>
        
        <Divider />

        <Box>
            <InfoText label={'Identificación'} data={`${user.id}`} icon={<BadgeOutlined />} />
            <InfoText label={'Email'} data={user.email} icon={<Email />} />
            <InfoText label={'Estado'} data={user.state ? 'Activo' : 'Deshabilitado'} icon={<Circle sx={{ color: user.state ? green.A700 : red.A700 }}  />} />

            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
                <Typography variant="overline" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }} >
                    <ManageAccounts />
                    Roles
                </Typography>
                <Box display={'flex'} gap={1} pl={4} flexWrap={'wrap'}>
                    {
                        user.roles.map((role) => (
                            <Box pl={2} pr={2} key={role.type} sx={{ background: '#89CFF0', borderRadius: '5px'  }}>
                                <Typography textAlign={'center'} >
                                    {role.type}
                                </Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>

        </Box>

    </CardContent>
  )
}
