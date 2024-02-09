import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactSVG } from "react-svg";
import Logo from "../images/logo-placeholder.svg"


export default function MyAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <ReactSVG src={Logo} alt="Logo" />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
                        Health Track Pro
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}