import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { People, Person, Settings, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import useProfilesContext from '../hooks/useProfilesContext';

const drawerWidth = 240;

export default function NavDrawer() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedChildIndex, setSelectedChildIndex] = React.useState(-1);
    const handleListItemClick = (event, isChild, index) => {
        if (isChild) {
            setSelectedIndex(-1);
            setSelectedChildIndex(index);
        } else {
            setSelectedIndex(index);
            setSelectedChildIndex(-1);
        }
    };

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
                <ListItemButton
                    component={Link} to={item.path}
                    selected={selectedChildIndex === profileItems.indexOf(item)}
                    onClick={(event) => handleListItemClick(event, true, profileItems.indexOf(item))}
                    sx={{ pl: 3 }}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItemButton>
            </List>
        </Collapse>
    })


    const renderedNavItems = navItems.map((item) => {
        if (!item.hasChildren) {
            return <ListItem key={item.label} disablePadding>
                <ListItemButton
                    component={Link} to={item.path}
                    selected={selectedIndex === navItems.indexOf(item)}
                    onClick={(event) => handleListItemClick(event, false, navItems.indexOf(item))}>
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
                    selected={selectedIndex === navItems.indexOf(item)}
                    onClick={(event) => handleListItemClick(event, false, navItems.indexOf(item))}>
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