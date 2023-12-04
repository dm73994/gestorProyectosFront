import { Inbox, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { AntTabs, AntTab, TabPanel } from '../../../../styled-components';
import { UserForm } from '../../components';
import { AuthInteface, CRUDActions } from '../../../../models';
import { UserInbox } from './UserInbox';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';


export const UserActionsTabs = () => {

  const userState: AuthInteface  = useSelector((state: AppStore) =>  state.user);
  const {user} = userState;
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const optionTabs = [
    {
      index: 0,
      label: 'Bandeja de entrada',
      icon: <Inbox />,
      content: <UserInbox />
    },
    {
      index: 1,
      label: 'Editar',
      icon: <Settings />,
      content: <UserForm user={user} action={CRUDActions.READ} />
    },
  ]

  return (
    <Box>
        
      <AntTabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        variant="fullWidth"
      >
        {optionTabs.map((option) => (
          <AntTab key={option.label} icon={option.icon} label={option.label} iconPosition="start" />
        ))}
      </AntTabs>

      {optionTabs.map((option) => (
        <TabPanel key={option.label} value={value} index={option.index}>
          {option.content}
        </TabPanel>
      ))}
    </Box>
  )
}
