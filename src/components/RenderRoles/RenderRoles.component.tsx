import { Box, IconButton, Typography } from '@mui/material'
import { theme } from '../../services'
import { Cancel } from '@mui/icons-material'
import { RoleModel } from '../../models'

interface IRenderRolesProps {
  roles: RoleModel[];
  active?: boolean;
}

export const RenderRolesComponent = ({roles, active = false}: IRenderRolesProps) => {
  return (
    <>
      {roles.map( role => (
        <Box 
          key={role.id}
          position={'relative'} 
          sx={{ 
            background: theme.palette.info.light ,
            textAlign: 'center',
            borderRadius: '5px',
            pl: 2,
            pr: 2,
            textTransform: 'uppercase',
            color: theme.palette.customs.dark,
            height: '1.5rem'
          }}
        >
          {active && (
            <IconButton sx={{ position: 'absolute', top: -10, right: -10, m:0, p: 0 }} >
              <Cancel color='error'/>
            </IconButton>
          )}
          <Typography variant='subtitle2'>{role.type}</Typography>
        </Box>
      ))}
    </>
  )
}
