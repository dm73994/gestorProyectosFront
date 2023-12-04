import { FormControl, Grid, Box, Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { useState } from 'react'
import { LittleUserCard, TableSelectUser, FileUploader, InputType, CustomButton } from '../../../../components'
import { useFormPropuesta } from '../../hooks'
import { UsersRoles } from '../../../../models'
import { TipoPropuesta } from '../../../PropuestasGrado/schemas/TipoPropuesta';
import { StyledInput } from '../../../../styled-components'
import { theme } from '../../../../services'

export const FormPropuesta = ({ type }: {type: TipoPropuesta}) => {
    
  const {
    usersList,
    currentUser,
    getUsersRol,
    handleAddAsistente,
    handleAddCodirector,
    handleAddEstudiante,
    handleRemoveAsistente,
    handleRemoveCodirector,
    handleRemoveEstudiante,
    handleUpdateFile,
    handleTitleChange,
    dataPropuesta,
    onSubmit
  } = useFormPropuesta();

  /**
   * States for modal open/close
   * to select codirector, asesor and students
   */
  const [openAsesores, setOpenAsesores] = useState(false);
  const [openDirectores, setOpenDirectores] = useState(false);
  const [openEstudiantes, setOpenEstudiantes] = useState(false);

  const handleOpenAsesores = () => {
    getUsersRol(UsersRoles.ASESOR);
    setOpenAsesores(true);
  }
  const handleOpenDirectores = () => {
    getUsersRol(UsersRoles.DIRECTOR);
    setOpenDirectores(true);
  }
  const handleOpenEstudiantes = () => {
    getUsersRol(UsersRoles.ESTUDIANTE);
    setOpenEstudiantes(true);
  }

  return (
    <form>
      <FormControl sx={{ width: '100%' }} >
        <Grid container spacing={4} sx={{ mr: 0}}>

          <Grid item md={12}>
            <Box sx={{
              maxHeight: '5rem',
              minHeight: '5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography sx={{ width: '15rem' }}> Título de propuesta </Typography>
              <StyledInput 
                onChange={(e) => handleTitleChange(e.target.value)}
                value={dataPropuesta.title}
                label={'Título'}
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

          <Grid item md={12}>
            <Typography sx={{ width: '15rem', mb: 2 }}> Integrantes </Typography>    
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 2 }} >
              {/* 
                Botones para agregar codirector, asesor y estudiantes
                */
              }
              {!dataPropuesta.codirector && (
                <CustomButton onClick={handleOpenDirectores} text={'Asignar Codirector'}  />
              )}

              {type == TipoPropuesta.PP && !dataPropuesta.asistente && (
                <CustomButton onClick={handleOpenAsesores} text={'Asignar Asesor'} />
              )}

              {type == TipoPropuesta.PP && dataPropuesta.estudiantes?.length === 0 && (
                <CustomButton onClick={handleOpenEstudiantes} text={'Asignar Estudiante'} />
              )}

              {type == TipoPropuesta.TI && dataPropuesta.estudiantes?.length < 2 && (
                <CustomButton onClick={handleOpenEstudiantes} text={'Asignar Estudiante(s)'} />
              )}
            </Box>  
          </Grid>

          <Grid item md={12}>
            <LittleUserCard user={currentUser} title={'Director'} />
          </Grid>
        
          {!!dataPropuesta.codirector && (
            <Grid item md={12}>
              <LittleUserCard 
                user={dataPropuesta.codirector} 
                title={'Codirector'} 
                color={green[200]} 
                isDelete 
                handleDelete={handleRemoveCodirector}
              />
            </Grid>
          )}

          {!!dataPropuesta.asistente && (
            <Grid item md={12}>
              <LittleUserCard 
                user={dataPropuesta.asistente} 
                title={'Asistente'} 
                color={green[200]} 
                isDelete 
                handleDelete={handleRemoveAsistente}
              />
            </Grid>
          )}

          {dataPropuesta.estudiantes?.map((estudiante) => 
            <Grid item md={12} key={estudiante.id}>
              <LittleUserCard 
                user={estudiante} 
                title={'Estudiante'} 
                color={green[200]} 
                isDelete 
                handleDelete={() => {handleRemoveEstudiante(estudiante)}}
              />
            </Grid>
          )}
        
          {/* MODALES */}
          <TableSelectUser
            open={openDirectores} 
            setOpen={setOpenDirectores} 
            userList={usersList} 
            setSelectedUser={handleAddCodirector} 
          />
          <TableSelectUser
            open={openAsesores} 
            setOpen={setOpenAsesores} 
            userList={usersList} 
            setSelectedUser={handleAddAsistente} 
          />
          <TableSelectUser
            open={openEstudiantes} 
            setOpen={setOpenEstudiantes} 
            userList={usersList} 
            setSelectedUser={handleAddEstudiante} 
          />



          
          {/* subir archivo  */}
          <Grid item md={12}>
            <Box height={300} width={'100%'} display={'flex'} justifyContent={'center'}>
              <FileUploader setUploadedFile={handleUpdateFile} uploadedFile={dataPropuesta.file} />
            </Box>
          </Grid> 
        </Grid>

        <Button 
          variant='contained' 
          color='success' 
          sx={{ mt: 2 }} 
          onClick={() =>{
            onSubmit(type)}
          }
        > 
          Registrar 
        </Button>
      </FormControl>
    </form>
  )
}
