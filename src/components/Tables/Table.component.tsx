// @MUI Components
import {  Pagination, Stack, Table, TableBody, TableContainer, TableHead } from '@mui/material';

// @Components
import { SxProps } from '@mui/material/styles';
import { TableHeader } from '.';

// @Interfaces
 interface IProps {
  Row: any;
  data: any[];
  props?: any;
  headers: string [];
  sx?: SxProps;
}

export const TableComponent = ({ Row, data, headers, props, sx = {} }: IProps) => {
  //const totalPages = calcPaginationPerPage(data.length, 5);
  return (
    <>
      <TableContainer sx={{ height: 400, boxShadow: 'none', backgroundColor: 'white', ...sx }}>
        <Table stickyHeader aria-label='sticky table' >
          <TableHead>
            <TableHeader headers={headers} />
          </TableHead>

          <TableBody sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
            {data?.length > 0 && (
              data.map(row => <Row key={row.id} index={row.id} row={row} {...props} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINACION */}
      <Stack spacing={2} >
        <Pagination count={10} page={1} onChange={() => {}} />
      </Stack>
    </>
  );
};
