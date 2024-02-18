import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactSVG } from "react-svg";
import Logo from "../images/logo-placeholder.svg"
import Button from '@mui/material/Button';

export default function MyAppBar({ isAuthenticated, onLogin, onLogout }) {
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="fixed" sx={ { zIndex: (theme) => theme.zIndex.drawer + 1 } }>
                <Toolbar>
                    <ReactSVG src={ Logo } alt="Logo" />
                    <Typography variant="h6" component="div" sx={ { flexGrow: 1, ml: 2 } }>
                        Health Track Pro
                    </Typography>
                    { !isAuthenticated ? (
                        <Button color="inherit" onClick={ onLogin }>Login</Button>
                    ) : (
                        <Button color="inherit" onClick={ onLogout }>Logout</Button>
                    ) }
                </Toolbar>
            </AppBar>
        </Box>
    );
}