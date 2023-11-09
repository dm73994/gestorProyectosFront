import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material'
import React, { useState } from 'react'
import { InputType, SearchField } from '../../../components';
import { UserListFilterModel } from '..';

enum FilterUser {
    ID = 'ID',
    NAME = 'NAME',
    USERNAME = 'USERNAME',
}

interface Props {
    handleFilerId: (id: number) => void;
    handleFilterName: (name: string) => void;
    handleFilterUsername: (username: string) => void;
    filterValue: UserListFilterModel;
}

export const UseListFilters = ({handleFilerId, handleFilterName, handleFilterUsername, filterValue}: Props) => {
  const [filter, setFilter] = useState<FilterUser>(FilterUser.ID);
  const [value, setValue] = useState<string | number>('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as FilterUser);
  };
  return (
    <Box sx={{ 
      display: 'flex',
      height: '40px',
      justifyContent: 'flex-start',
    }}>
      {filter === FilterUser.ID && (
        <SearchField value={filterValue.id} placeholder='Digite el número de ID' handleFilter={handleFilerId} type={InputType.NUMBER} />
      )}
      {filter === FilterUser.NAME && (
        <SearchField value={filterValue.name} placeholder='Ingrese el nombre' handleFilter={handleFilterName}/>
      )}
      {filter === FilterUser.USERNAME && (
        <SearchField value={filterValue.username} placeholder='Ingrese el nombre de usuario' handleFilter={handleFilterUsername}/>
      )}

      <InputLabel id="filterUser-labelId">Age</InputLabel>
      <Select
        labelId="filterUser-labelId"
        value={filter}
        label="Filtrar usuarios"
        onChange={handleChange}
      >
        <MenuItem value={FilterUser.ID}>Identificación</MenuItem>
        <MenuItem value={FilterUser.NAME}>Nombre</MenuItem>
        <MenuItem value={FilterUser.USERNAME}>Nombre de usuario</MenuItem>
      </Select>

    </Box>
  )
}
