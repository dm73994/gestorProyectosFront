import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { useUser } from '..';
import { getUsers } from '../../../services/API/User.service';
import { useEffect } from 'react';
import { UserModel } from '../../../models';
import { TableComponent } from '../../../components';
import { green, red } from '@mui/material/colors';
import { LimitedText } from '../../../styled-components';

interface IRowProps {
    row: UserModel;
}

const Row = ({ row }: IRowProps) => {
    return (
      <TableRow >

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
                {
                    row.roles.map((role) => (
                        <Box pl={2} pr={2} key={role.type} sx={{ background: '#89CFF0', borderRadius: '5px'  }}>
                            <Typography textAlign={'center'} >
                                {role.type}
                            </Typography>
                        </Box>
                    ))
                }
            </Box>
        </TableCell>

        <TableCell sx={{ maxWidth: '10rem' }}>
          <Typography sx={{ textAlign: 'center' }}>
              {row.state ? (
                <Box sx={{ bgcolor: green.A700, color: '#fff', borderRadius: '5px' }} >
                    Activo
                </Box>
                ) 
                : <Box sx={{ bgcolor: red.A700, color: '#fff', borderRadius: '5px', pl: 1, pr: 1 }} >
                    Deshabilitado
                </Box>
            }
          </Typography>
        </TableCell>

        <TableCell>
          <>
            {   
                
            }
          </>
        </TableCell>

      </TableRow>
    );
};


const UsersListPage = () => {

    const {usersList, getUsersList} = useUser();

    // ejecutamos una vez al cargar el componente
    useEffect(() => {
        getUsersList();
    }, []);

    return (
        <>
            <Typography>LISTA DE USUARIOS</Typography>
            {
                <TableComponent 
                    Row={Row} 
                    data={usersList}
                    headers={[  'id', 'Nombre', 'Email', 'Roles', 'Estado', 'Acciones' ] } 
                />

            }
        </>
    )
}

export default UsersListPage;
