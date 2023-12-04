import { Visibility, BiotechSharp, Engineering } from '@mui/icons-material'
import { Box, ListItem, Tooltip, IconButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'
import { TipoPropuesta } from '../..'
import { DetailsPropuesta } from '../../../../models/Formatos/DetailsPropuesta.model';

interface IListPropuestaItemProps{
    propuesta: DetailsPropuesta;
    handleConsultNavigation: (idPropuesta: number) => void;
    forSelection?: boolean;
}

export const ListPropuestaItem = ({ propuesta, handleConsultNavigation, forSelection = false }: IListPropuestaItemProps) => {
  return (
    <Box key={propuesta.title} sx={{ width: '100%' }}>
      <ListItem secondaryAction={
        <Tooltip title='Ver propuesta'>
          {!forSelection && (
            <IconButton onClick={() => handleConsultNavigation(propuesta.idPropuesta)}>
              <Visibility color='info' />
            </IconButton>
          )}
        </Tooltip>
      }>
  
        <ListItemIcon>
          {propuesta.type === TipoPropuesta.TI
            ? <BiotechSharp />
            : <Engineering />}
        </ListItemIcon>
        <ListItemText primary={propuesta.title} />
        <Box display={'flex'} mr={4}>
          <Typography variant='caption' textAlign={'center'}> Publicación {propuesta.date.toLocaleDateString()} </Typography>
          <Box sx={{
            backgroundColor: `${propuesta.avalado !== null ? 'success.main' : 'warning.main'}`,
            color: '#fff',
            padding: '0px 4px',
            borderRadius: '5px',
            ml: 2
          }}>
            <Typography variant='caption' textAlign={'center'}>
              {propuesta.avalado === null ? 'REVISIÓN' : 'AVALADO'}
            </Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
  )
}
