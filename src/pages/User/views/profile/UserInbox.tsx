import { Box } from '@mui/material'
import React, { useLayoutEffect } from 'react'
import { useUser } from '../..'
import { CustomLoader } from '../../../../components';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { 
    field: 'emisorName', 
    headerName: 'Enviado por', 
    width: 150,
    valueGetter: (params) => params.row.emisor.name,
  },
  {
    field: 'message',
    headerName: 'Mensaje',
    width: 300,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Fecha',
    width: 120,
    editable: true,
  },
];

export const UserInbox = () => {
  const {
    inbox,
    getUserInbox,
    loading
  } = useUser();

  useLayoutEffect(() => {
    getUserInbox()
  }, [])

  if(loading){
    return <CustomLoader />
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={inbox}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        onRowClick={(params) => console.log(params)}
      />
    </Box>
  )
}
