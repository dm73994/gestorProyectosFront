import { FormControl, Grid, Box, Typography, Button, Select, MenuItem } from '@mui/material'
import { InputType, CustomButton, LittleUserCard, FileUploader, TableSelectUser } from '../../../../../components'
import { theme } from '../../../../../services'
import { StyledCard, StyledInput } from '../../../../../styled-components'
import { SelectPropuestasList } from '../../../components/SelectPropuestasList/SelectPropuestasList'
import { ListPropuestaItem } from '../../../../PropuestasGrado/components/ListPropuestaItem'
import { Cancel } from '@mui/icons-material'
import { useFormAnteproyecto } from '../../../hooks'
import { green } from '@mui/material/colors'


interface IProps {
  format: 'TI' | 'PP';
}

export const FormAnteproyecto = ({format}: IProps) => {

  const {
    currentUser,
    propuestaHandler,
    propuestaData,
    formData,
    openAntepropuestas,
    openCodirectores,
    coordinadoresList,
    handleChangePeriodo,
    handleSelectedPropuesta,
    handleDeletePropuesta,
    handleUploadFile,
    handleTitle,
    onSubmit,
    setOpenAntepropuestas,
    setOpenCodirectores,
    handleCodirector,
    handleRemoveCodirector
  } = useFormAnteproyecto(format);  

  return (
    <form>
      <FormControl sx={{ width: '100%' }} >
        <Grid container spacing={4} sx={{ mr: 0}}>

          <Grid item md={10}>
            <Typography sx={{ width: '15rem' }}> Título de anteproyecto </Typography>
            <Box sx={{
              maxHeight: '5rem',
              minHeight: '5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <StyledInput 
                onChange={(e) => handleTitle(e.target.value) }
                value={formData.titulo}
                variant='outlined'
                type={InputType.TEXT} 
                placeholder={'Escriba el título de la propuesta'}
                fullWidth
                InputProps={{
                  style: { 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderColor: 'blue'
                  }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.info.main }, // Cambia el color del label como desees
                }}
              />
            </Box>
          </Grid>

          <Grid item md={2}>
            <Typography sx={{ width: '15rem' }}> Periodo académico </Typography>
            <Box sx={{
              maxHeight: '5rem',
              minHeight: '5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}>
              <Select
                value={''+formData.idAnteproyecto}
                onChange={handleChangePeriodo}
                sx={{ 
                  width: '100%',
                  height: '100%',
                }}
                slotProps={{
                }}
                MenuProps={{
                  sx: {
                    '& ul': {
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                    '& ul>li:hover': {
                      backgroundColor: 'primary.main',
                      color: '#fff',
                    }
                  }
                }}
              >
                <MenuItem disabled value={-1}>
                    Seleccionar
                </MenuItem>
                <MenuItem value={1}> {new Date().getFullYear()}.1 </MenuItem>
                <MenuItem value={2}> {new Date().getFullYear()}.2 </MenuItem>
              </Select>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Typography sx={{ mb: 2 }}> Propuesta de grado de referencia <span style={{ fontSize: 12 }}>(Formato A)</span> </Typography>    
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 2 }} >
              {/* Botones para Seleccionar propuesta de grado referencial */}
              {propuestaData == null && (
                <CustomButton onClick={() => setOpenAntepropuestas(true)} text={'Seleccionar propuesta Formato A'}  />
              )}
              {!!propuestaData && (
                <Grid item md={12}>
                  <StyledCard sx={{ display: 'flex', bgcolor: green[100] }}>
                    <Button onClick={handleDeletePropuesta} variant='contained' sx={{ bgcolor: 'error.main' }} >
                      <Cancel />
                    </Button>
                    <ListPropuestaItem 
                      propuesta={propuestaData}
                      handleConsultNavigation={() => {}}
                      forSelection
                    />
                  </StyledCard>
                </Grid>
              )}
            </Box>  
          </Grid>


          <Grid item md={12}>
            <Typography sx={{ width: '15rem', mb: 2 }}> Integrantes </Typography>    
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 2 }} >
              {/* Botones para agregar codirector, asesor y estudiantes */}
              {!!propuestaData && propuestaData.codirector === null && (
                <CustomButton onClick={() => setOpenCodirectores(true)} text={'Asignar Codirector'}  />
              )}

            </Box>  
          </Grid>

          <Grid item md={12}>
            <LittleUserCard user={currentUser} title={'Director'} />
          </Grid>

          <Grid item md={12}>
            {!!propuestaData && propuestaData.codirector != null && (
              <LittleUserCard 
                user={propuestaData.codirector} 
                title={'Codirector'} 
                isDelete 
                handleDelete={handleRemoveCodirector}
              />
            )}
          </Grid>

          <Grid item md={12}>
            {!!propuestaData && propuestaData.asistente != null && (
              <LittleUserCard 
                user={propuestaData.asistente} 
                title={'Asistente'} 
              />
            )}
          </Grid>

          <Grid item md={12}>
            {!!propuestaData && propuestaData.estudiantes.map((estudiante) => (
              <LittleUserCard user={estudiante} title={'Estudiante'} />
            ))}
          </Grid>

      
          {/* MODALES */}
          <SelectPropuestasList 
            open={openAntepropuestas} 
            setOpen={setOpenAntepropuestas} 
            propuestasList={propuestaHandler.propuestasUser} 
            setSelectedPropuesta={handleSelectedPropuesta}
          />
          <TableSelectUser
            open={openCodirectores} 
            setOpen={setOpenCodirectores} 
            userList={coordinadoresList} 
            setSelectedUser={handleCodirector} 
          />

          {/* subir archivo  */}
          <Grid item md={12}>
            <Box height={300} width={'100%'} display={'flex'} justifyContent={'center'}>
              <FileUploader setUploadedFile={handleUploadFile} uploadedFile={formData.file} />
            </Box>
          </Grid> 

        </Grid>

        <Button 
          variant='contained' 
          color='success' 
          sx={{ mt: 2 }} 
          onClick={onSubmit}
        > 
          Registrar 
        </Button>
      </FormControl>
    </form>
  )
}
