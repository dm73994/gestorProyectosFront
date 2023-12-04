import { Visibility, BiotechSharp, Engineering } from '@mui/icons-material';
import { Box, ListItem, Tooltip, IconButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { AnteproyectoType, DetailsAnteproyecto } from '../../../../models';
import { FormatState } from '../../../../components';

interface IListAnteproyectoItemProps{
    anteproyecto: DetailsAnteproyecto;
    handleConsultNavigation: (idPropuesta: number) => void;
    forSelection?: boolean;
}

export const ListAnteproyectoItem = ({ anteproyecto, handleConsultNavigation, forSelection = false }: IListAnteproyectoItemProps) => {
  return (
    <Box key={anteproyecto.title} sx={{ width: '100%' }}>
      <ListItem secondaryAction={
        <Tooltip title='Ver anteproyecto'>
          {!forSelection && (
            <IconButton onClick={() => handleConsultNavigation(anteproyecto.idPropuesta)}>
              <Visibility color='info' />
            </IconButton>
          )}
        </Tooltip>
      }>
  
        <ListItemIcon>
          {anteproyecto.type === AnteproyectoType.TI_B
            ? <BiotechSharp />
            : <Engineering />}
        </ListItemIcon>
        <ListItemText primary={anteproyecto.title} />
        <Box display={'flex'} mr={4}>
          <Typography variant='caption' textAlign={'center'}> Publicación {anteproyecto.date.toLocaleDateString()} </Typography>
          <FormatState state={anteproyecto.state} />
        </Box>
      </ListItem>
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
  )
}
