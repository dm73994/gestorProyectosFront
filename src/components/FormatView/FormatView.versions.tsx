import React from 'react'
import { Box, Button, Collapse, Grid, Grow, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DetailsAnteproyectoReview } from '../../models';
import { Build, ExpandLess, ExpandMore, FileDownloadOutlined } from '@mui/icons-material';
import { UserBrief } from '..';

interface IFormatViewVersionsProps {
  reviews: DetailsAnteproyectoReview[];
}


export const FormatViewVersions = ({reviews}: IFormatViewVersionsProps) => {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  /**
   * Eliminamos las versiones inexistentes para solo renderizar revisiones creadas
   */
  const completedReview = reviews.filter( r => r != null);

  return (
    <Box sx={{ padding: '0rem 2rem 2rem 2rem', width: '100%' }}>
      <Typography sx={{ mb: 2 }}> EVALUACIONES </Typography>
      
      <Grid container >

        {completedReview.map(( review, index ) => (
          <Grid item xs={12} key={review.id}>
            <List sx={{ width: '100%', maxWidth: '100%' }}>
              <ListItemButton onClick={handleClick} sx={{ borderBottom: '0.5px solid', borderColor: 'text.disabled' }} >
                <ListItemIcon>
                  <Build />
                </ListItemIcon>
                <ListItemText primary={`Version ${index+1}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Grow
                  in={open}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(open ? { timeout: 700 } : {})}
                >
                  <List component="div" disablePadding>
                    
                    <ListItem sx={{ pl: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} divider>
                      <UserBrief title='Evaluador' name={review.evaluacion1.evaluator.name} username={review.evaluacion1.evaluator.username} />                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography textAlign={'center'} variant={'button'} > DOCUMENTOS </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          { review.evaluacion1.reviewFile && (
                            <Button variant='contained' startIcon={<FileDownloadOutlined />} color={'info'} >
                              Evaluación
                            </Button>
                          )}
                          { review.evaluacion1.observationsFile && (
                            <Button variant='contained' startIcon={<FileDownloadOutlined />} color={'info'} >
                              Observaciones
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </ListItem>

                    <ListItem sx={{ pl: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} divider>
                      <UserBrief title='Evaluador' name={review.evaluacion2.evaluator.name} username={review.evaluacion2.evaluator.username} />                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography textAlign={'center'} variant={'button'} > DOCUMENTOS </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>

                          { review.evaluacion2.reviewFile && (
                            <Button variant='contained' startIcon={<FileDownloadOutlined />} color={'info'} >
                              Evaluación
                            </Button>
                          )}
                          { review.evaluacion2.observationsFile && (
                            <Button variant='contained' startIcon={<FileDownloadOutlined />} color={'info'} >
                              Observaciones
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </ListItem>
                  </List>
                </Grow>
              </Collapse>
            </List>
          </Grid>
        ))}

      </Grid>
    </Box>
  )
}
