import { Phone, PhoneMissed, Favorite, PersonPin, Settings } from '@mui/icons-material';
import { Tabs, Tab, styled, Box } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { UserModel } from '../../../../models/User.model';
import { AntTabs, AntTab, TabPanel } from '../../../../styled-components';
import { UserForm } from '../../components';


interface IUserActionsTabsProps {
  user: UserModel;
}

export const UserActionsTabs = ({user}: IUserActionsTabsProps) => {

    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const optionTabs = [
        {
            label: 'Editar',
            icon: <Settings />,
            content: <UserForm user={user} />
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
          <TabPanel value={value} index={0}>
            {option.content}
          </TabPanel>
        ))}
      </Box>
    )
}
