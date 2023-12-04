import { Box, Grid, IconButton, Typography } from '@mui/material'
import { theme } from '../../services'
import { AddCircleSharp, Cancel } from '@mui/icons-material'
import { RoleModel } from '../../models'

interface IRenderRolesProps {
  roles: RoleModel[];
  active?: boolean;
  handleRoleState?: (role: RoleModel) => void;
}

export const RenderRolesComponent = ({roles, handleRoleState}: IRenderRolesProps) => {


  const rednderActions = (role: RoleModel) => {
    if(role.state === undefined) return <></>

    if(role.state === 'remove'){
      return (
        <IconButton sx={{ position: 'absolute', top: -10, right: -10, m:0, p: 0 }} onClick={() => handleRoleState(role)} >
          <Cancel color='error'/>
        </IconButton>
      )
    }

    if(role.state === 'add'){
      return (
        <IconButton sx={{ position: 'absolute', top: -10, right: -10, m:0, p: 0 }} onClick={() => handleRoleState(role)}>
          <AddCircleSharp color='success'/>
        </IconButton>
      )
    }
  }

  return (
    <>
      {roles.map( role => (
        <Grid item key={role.id}>
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
            {rednderActions(role)}
            <Typography variant='subtitle2'>{role.type}</Typography>
          </Box>
        </Grid>
      ))}
    </>
  )
}
