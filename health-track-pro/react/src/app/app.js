import axios from 'axios';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import MyAppBar from "../components/AppBar";
import Box from '@mui/material/Box';
import NavDrawer from "../components/NavDrawer";
import ProfilesPage from '../pages/ProfilesPage';
import SettingsPage from '../pages/SettingsPage';


export function App() {


  const [test, setTest] = useState();
  const [authStatus, setAuthStatus] = useState('Logged out');
  const [userProfile, setUserProfile] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    console.log(2)

    axios
      .get("http://localhost:3333/api")
      .then(response => setTest(response.data.message))
      .catch(error => console.log(error))

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

  return (
    <div>
      <li>{ test }</li>
      <li>{ authStatus }</li> {/* Display the authentication status */ }
      { userProfile.isAuthenticated && `Hello, ${userProfile.user.nickname}` }
      <MyAppBar isAuthenticated={ userProfile.isAuthenticated } onLogin={ handleLogin } onLogout={ handleLogout } />
      <Box sx={ { display: 'flex' } }>
        <NavDrawer />
        <Box component="main" sx={ { flexGrow: 1, p: 3 } }>
          <Routes>
            <Route
              path="/"
              element={ <ProfilesPage /> }
            />
            <Route
              path="/settings"
              element={ <SettingsPage /> }
            />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
export default App;