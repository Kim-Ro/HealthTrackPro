import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { People, Person, Settings, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import useProfilesContext from '../hooks/useProfilesContext';

const drawerWidth = 240;

export default function NavDrawer() {
    const location = useLocation().pathname;

    const [open, setOpen] = React.useState(true);
    const handleChevronClick = () => {
        setOpen(!open);
    };

    const { profiles } = useProfilesContext();

    const profileItems = profiles.map((profile) => {
        return { label: profile.name, path: "/profile/" + profile._id, icon: <Person />, parent: "Profiles" }
    });

    const navItems = [
        { label: "Profiles", path: "/", icon: <People />, hasChildren: true },
        { label: "Settings", path: "/settings", icon: <Settings />, hasChildren: false }
    ]


    const renderedProfileItems = profileItems.map((item) => {
        return <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem key={item.label} disablePadding>
                    <ListItemButton
                        component={Link} to={item.path}
                        selected={location == item.path}
                        sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Collapse>
    })


    const renderedNavItems = navItems.map((item) => {
        if (!item.hasChildren) {
            return <ListItem key={item.label} disablePadding>
                <ListItemButton
                    component={Link} to={item.path}
                    selected={location == item.path}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItemButton>
            </ListItem>
        } else {
            return <div><ListItem key={item.label} disablePadding>
                <ListItemButton
                    component={Link} to={item.path}
                    selected={location == item.path}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    {open ? <ExpandLess onClick={(event) => handleChevronClick(event)} /> : <ExpandMore onClick={(event) => handleChevronClick(event)} />}
                </ListItemButton>
            </ListItem>
                {renderedProfileItems}
            </div>
        }


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
                <List> {renderedNavItems}
                </List>

            </Box>
        </Drawer>
    );
}