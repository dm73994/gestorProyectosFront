import { ExpandLess, ExpandMore, Inbox, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLinkProps } from '../../models'
import { NavLinkComponent } from '.'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface GroupProps {
    links: NavLinkProps[]
}

export const NavGroupComponent = ({links}: GroupProps) => {
    const {palette} = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Inbox sx={{ color: palette.customs.dark }} />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className='animate__slideInDown'>
                <List disablePadding >
                    {
                        links.map( link => {
                            return <NavLinkComponent key={link.text} icon={link.icon} path={link.path} text={link.text} agruoped/>
                            
                        })
                    }
                </List>
            </Collapse>
        </>
    )
}
