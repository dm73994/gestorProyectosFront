import { Box, Button, Divider, IconButton, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { useUser } from '../..';
import { useEffect, useState } from 'react';
import { UserModel } from '../../../../models';
import { RenderRolesComponent, TableComponent, UserStateComponent } from '../../../../components';
import { green, red } from '@mui/material/colors';
import { LimitedText, StyledCard } from '../../../../styled-components';
import { Edit, PersonAdd, ToggleOff, ToggleOn, Visibility } from '@mui/icons-material';
import { UseListFilters, UserInfo } from '../../components';

interface IRowProps {
    row: UserModel;
    onRowClick?: (user: UserModel) => void;
    handleUpdateUserNavigation?: (id: number) => void;
    handleChangeUserState: (userId: number) => void;
}

const Row = ({ row, onRowClick, handleUpdateUserNavigation, handleChangeUserState }: IRowProps) => {
    
  return (
    <TableRow onClick={() => onRowClick}>

      <TableCell>
        <Typography sx={{ textAlign: 'center' }}>
          {row.id} 
        </Typography>
      </TableCell>

      <TableCell>
        <LimitedText sx={{ textAlign: 'center' }}>
          {row.name} {row.lastname}
        </LimitedText>
      </TableCell>

      <TableCell>
        <LimitedText sx={{ textAlign: 'center' }}>
          {row.email}
        </LimitedText>
      </TableCell>

      <TableCell>
        <Box display={'flex'} gap={1} pl={4} flexWrap={'wrap'}>
          <RenderRolesComponent roles={row.roles} />
        </Box>
      </TableCell>
        

      <TableCell sx={{ maxWidth: '10rem' }}>
        <UserStateComponent state={row.state} />
      </TableCell> 

      <TableCell>
        <Box display={'flex'}>
          {/* Ver USUARIO */}
          {   
            row.permissions.user.consult && (
              <IconButton title='Ver usuario' onClick={() => onRowClick(row)}>
                <Visibility sx={{ color: '#00BFFF' }} />
              </IconButton>
            )
          }
          {/* EDITAR USUARIO */}
          {   
            row.permissions.user.edit && (
              <IconButton title='Editar usuario' onClick={() => handleUpdateUserNavigation(row.id)}>
                <Edit sx={{ color: '#16166B' }} />
              </IconButton>
            )
          }
          {/* DESACTIVAR USUARIO */}
          {   
            row.permissions.user.active && (
              <IconButton title={row.state ? 'Desactivar Usuario' : 'Activar usuario'} onClick={() => handleChangeUserState(row.id)}>
                {row.state ? <ToggleOn sx={{ color: green.A700 }} /> : <ToggleOff sx={{ color: red.A700 }} /> }
              </IconButton>
            )
          }
        </Box>
      </TableCell>

    </TableRow>
  );
};

const UsersListPage = () => {

  const [open, setOpen] = useState<boolean>(false); 
  const [user, setViewUser] = useState<UserModel | null>(null); 
  const {
    usersList, 
    getUsersList, 
    onChangeUserState,
    handleUpdateUserNavigation,
    handleCreateUserNavigation,
    handleFilterIdChange,
    handleFilterNameChange,
    handleFilterUsernameChange,
    filter
  } = useUser(); 
    

  // ejecutamos una vez al cargar el componente
  useEffect(() => {
    getUsersList();
  }, []);

  // OPCIONES PARA CONTROLAR EL MODAL DE LA VISTA DE USUARIO
  const onRowClick = (user: UserModel) => {
    setViewUser(user);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }



  return (
    <StyledCard sx={{ padding: 3 }}>
      <Box display={'flex'} justifyContent={'center'} >
        <Typography>LISTA DE USUARIOS</Typography>
      </Box>
            
      <Divider sx={{ mb: 4, mt: 2 }} />
            

      <Box display={'flex'} justifyContent={'space-between'} mb={4}>
        <UseListFilters 
          handleFilerId={handleFilterIdChange} 
          handleFilterName={handleFilterNameChange} 
          handleFilterUsername={handleFilterUsernameChange}
          filterValue={filter}
        />
        <Button variant='contained' color={'info'} onClick={handleCreateUserNavigation}>
          <PersonAdd />
                    AGREGAR USUARIO
        </Button>
      </Box>

      
      <TableComponent 
        Row={Row} 
        data={usersList}
        headers={[  'id', 'Nombre', 'Email', 'Roles', 'Estado', 'Acciones' ] } 
        props={{
          onRowClick: onRowClick,
          handleUpdateUserNavigation: handleUpdateUserNavigation,
          handleChangeUserState: onChangeUserState
        }}
      />
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledCard sx={{ 
          maxWidth: '50vw', 
          maxHeight: '90vh',     
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
        }}>
          <UserInfo user={user} />
        </StyledCard>
      </Modal>
    </StyledCard>
  )
}

export default UsersListPage;
