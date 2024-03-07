import axios from 'axios';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import MyAppBar from "../components/AppBar";
import { Box, Typography, Button } from '@mui/material';
import NavDrawer from "../components/NavDrawer";
import ProfilesOverviewPage from '../pages/ProfilesOverviewPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';
import useProfilesContext from '../hooks/useProfilesContext';

export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3333/auth/status', { withCredentials: true })
      .then(response => { setIsLoggedIn(response.data.isAuthenticated); })
      .catch(error => console.log(error));

    axios.get('http://localhost:3333/auth/profile', { withCredentials: true })
      .then(response => { setIsLoggedIn(response.data.isAuthenticated); })
      .catch(error => console.log(error));
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3333/login';
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:3333/logout';
  };

  // Profiles

  const { profiles, stableFetchProfiles } = useProfilesContext();
  const counter = profiles.length;

  useEffect(() => {
    stableFetchProfiles();
  }, [counter]);

  let appContent = null;
  if (isLoggedIn) {
    appContent = <Box sx={{ display: 'flex' }}>
      <NavDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route
            path="/"
            element={<ProfilesOverviewPage />}
          />
          <Route
            path="/profile/:profileId"
            element={<ProfilePage />}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Routes>
      </Box>
    </Box>
  } else {
    appContent = <Box component="main" sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
      <Box>
        <Typography variant="h2" component="h1" mb={2}>Welcome to Health Track Pro!</Typography>
        <Typography variant="body1" component="p" mb={2}>Log in or sign up with a few clicks</Typography>
        <Button variant="contained" onClick={handleLogin}>Login or sign up</Button>
      </Box>
    </Box>
  }

  //Rendered components
  return (
    <div>
      <MyAppBar isAuthenticated={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      {appContent}
    </div>
  );
}
export default App;