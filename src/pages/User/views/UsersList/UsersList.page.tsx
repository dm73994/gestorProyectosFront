import { Box, Button, Divider, IconButton, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { useUser } from '../..';
import { getUsers } from '../../../../services/API/User.service';
import { useEffect, useState } from 'react';
import { UserModel } from '../../../../models';
import { RenderRolesComponent, TableComponent, UserStateComponent } from '../../../../components';
import { blue, green, red } from '@mui/material/colors';
import { LimitedText, PinkSwitch, StyledCard } from '../../../../styled-components';
import { Edit, PersonAdd, ToggleOff, ToggleOn, Visibility } from '@mui/icons-material';
import { UserInfo } from '../../components';
import { useNavigate, useNavigation } from 'react-router-dom';
import { UserAdapter } from '../../../../adapters';

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
          <Typography sx={{ textAlign: 'center' }}>
              <UserStateComponent state={row.state} />
          </Typography>
        </TableCell>

        <TableCell>
          <Box display={'flex'}>
            {/* Ver USUARIO */}
            {   
                row.permissions.viewUser && (
                    <IconButton title='Ver usuario' onClick={() => onRowClick(row)}>
                        <Visibility sx={{ color: '#00BFFF' }} />
                    </IconButton>
                )
            }
            {/* EDITAR USUARIO */}
            {   
                row.permissions.editUser && (
                    <IconButton title='Editar usuario' onClick={() => handleUpdateUserNavigation(row.id)}>
                        <Edit sx={{ color: '#16166B' }} />
                    </IconButton>
                )
            }
            {/* DESACTIVAR USUARIO */}
            {   
                row.permissions.activeUser && (
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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UsersListPage = () => {

    const {usersList, getUsersList, onChangeUserState } = useUser(); 
    const [open, setOpen] = useState<boolean>(false); 
    const [user, setViewUser] = useState<UserModel | null>(null); 
    const navigate = useNavigate();

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

    // HANDLE NAVIGATION TO ROUTE: users/create
    const handleCreateUserNavigation = () => {
        navigate('/users/create');
    }

    // HANDLE NAVIGATION TO ROUTE: users/update/:id
    const handleUpdateUserNavigation = (id: number) => {
        navigate(`/users/update/${id}`);
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} >
                <Typography>LISTA DE USUARIOS</Typography>
                <Button variant='contained' color={'info'} onClick={handleCreateUserNavigation}>
                    <PersonAdd />
                    AGREGAR USUARIO
                </Button>
            </Box>
            <Divider sx={{ mb: 4, mt: 2 }} />
            {
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
            }
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
        </>
    )
}

export default UsersListPage;
