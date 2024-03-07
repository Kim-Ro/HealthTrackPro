import axios from 'axios';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import MyAppBar from "../components/AppBar";
import Box from '@mui/material/Box';
import NavDrawer from "../components/NavDrawer";
import ProfilesOverviewPage from '../pages/ProfilesOverviewPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';
import useProfilesContext from '../hooks/useProfilesContext';

export function App() {

  //Authentication
  //TODO: refactor that and put it in a Provider to keep this file clean

  const [authStatus, setAuthStatus] = useState('Logged out');
  const [userProfile, setUserProfile] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    axios
      .get('http://localhost:3333/auth/status', { withCredentials: true })
      .then(response => {
        const status = response.data.isAuthenticated ? 'Logged in' : 'Logged out';
        setAuthStatus(status);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:3333/auth/profile', { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setUserProfile({
            isAuthenticated: response.data.isAuthenticated,
            user: response.data.user
          });
          setAuthStatus('Logged in');
        } else {
          setAuthStatus('Logged out');
        }
      })
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

  //Rendered components
  return (
    <div>
      <MyAppBar isAuthenticated={userProfile.isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      <Box sx={{ display: 'flex' }}>
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
    </div>
  );
}
export default App;