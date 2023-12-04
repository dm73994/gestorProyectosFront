import { Box, Typography } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { estadosPropuesta } from '../..'
import { FilterButton } from '../../../../components'

interface IHeaderPropuestasProps {
  filterByEstado: (estado: number) => void;
}

export const HeaderPropuestas = ({
  filterByEstado
}: IHeaderPropuestasProps) => {

  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} mb={2}>

      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="DESDE"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              slotProps={{
                field: { clearable: true },
                textField: {
                  helperText: 'MM/DD/YYYY',
                },
              }} />
            <DatePicker
              label="HASTA"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              slotProps={{
                field: { clearable: true },
                textField: {
                  helperText: 'MM/DD/YYYY',
                },
              }} />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <Box>
        <Typography> Filtrar por: </Typography>
        <FilterButton
          title='Estado'
          actions={[
            { title: estadosPropuesta[1], action: () => filterByEstado(1) },
            { title: estadosPropuesta[0], action: () => filterByEstado(0) },
            { title: estadosPropuesta[-1], action: () => filterByEstado(-1) },
          ]}
        />
      </Box>

    </Box>
  )
}
