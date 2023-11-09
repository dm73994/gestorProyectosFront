import { TableCell, TableRow } from '@mui/material';

interface colProps {
 headers: any[];
}

export const TableHeader = ({ headers }: colProps) => {
  return (
    <TableRow sx={{ backgroundColor: 'primary.main' }}>
      {headers.map(title => (
        <TableCell
          key={title}
          sx={{ color: '#fff', fontWeight: 'bold', backgroundColor: 'primary.main', borderBlockColor: 'primary.main' }}
          align='center'
          //align={Array.isArray(h) ? h[1] : 'center'}
        >
          {title}
          {/* {Array.isArray(h) ? h[0] : h} */}
        </TableCell>
      ))}
    </TableRow>
  );
};

