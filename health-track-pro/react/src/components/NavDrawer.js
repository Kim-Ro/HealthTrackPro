import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

export default function NavDrawer() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const navItems = [
        { label: "Profiles", path: "/", icon: <PeopleIcon /> },
        { label: "Settings", path: "/settings", icon: <SettingsIcon /> }
    ];

    const renderedNavItems = navItems.map((item) => {
        return <ListItem key={item.label} disablePadding>
            <ListItemButton
                component={Link} to={item.path}
                selected={selectedIndex === navItems.indexOf(item)}
                onClick={(event) => handleListItemClick(event, navItems.indexOf(item))}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
            </ListItemButton>
        </ListItem>
    });

    return (
        <Drawer variant="permanent" anchor="left" component="nav"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List> {renderedNavItems}</List>
            </Box>
        </Drawer>
    );
}