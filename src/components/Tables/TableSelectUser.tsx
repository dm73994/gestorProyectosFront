import { Typography, Box, Modal, Button } from '@mui/material';
import { UserModel } from '../../models';
import { ModalBox } from '../../styled-components';
import { useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { RenderRolesComponent, UserStateComponent } from '..';


interface IModalTableProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userList: UserModel[];
    setSelectedUser: any;
}

interface IRowProps {
    row: UserModel;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: '',
    headerName: 'Nombre',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name || ''} ${params.row.lastname || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'roles',
    headerAlign: 'left',
    align: 'left',
    headerName: 'Roles',
    type: 'number',
    width: 150,
    renderCell: (params: IRowProps) => {
      return <RenderRolesComponent roles={params.row.roles} />
    }
  },
  {
    field: 'state',
    headerName: 'Estado',
    width: 150,
    renderCell: (params: IRowProps) => {
      return <UserStateComponent state={params.row.state} />
    }
  },
];

export const TableSelectUser = ({ open, setOpen, userList, setSelectedUser }: IModalTableProps) => {

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    if (rowSelectionModel.length > 0) {
      // Obtener el ID de la fila seleccionada
      const selectedRowId: GridRowId = rowSelectionModel[0];

      // Buscar la fila seleccionada en la lista de usuarios
      const selectedUser = userList.find((user) => user.id === selectedRowId);

      if (selectedUser) {
        // Realiza acciones con la fila seleccionada, por ejemplo, establecerla como usuario seleccionado
        setSelectedUser(selectedUser);
      }
    }
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Seleccione un usuario
        </Typography>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          } }
          rowSelectionModel={rowSelectionModel}
          rows={userList} 
          columns={columns}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, mt: 2 }} >
          <Button variant='contained' color='error' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' color='info' onClick={handleAccept}>
            Aceptar
          </Button>

        </Box>
      </ModalBox>
    </Modal>
  )
}
