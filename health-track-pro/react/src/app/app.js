import axios from 'axios';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import MyAppBar from "../components/AppBar";
import Box from '@mui/material/Box';
import NavDrawer from "../components/NavDrawer";
import ProfilesOverviewPage from '../pages/ProfilesOverviewPage';
import SettingsPage from '../pages/SettingsPage';
import useProfilesContext from "../hooks/useProfilesContext";
import ProfilePage from '../pages/ProfilePage';

export function App() {

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

  // hint for dynamic URLs
  // https://stackoverflow.com/questions/60295654/react-router-dynamically-url-id
  // https://reactrouter.com/en/main/route/route

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