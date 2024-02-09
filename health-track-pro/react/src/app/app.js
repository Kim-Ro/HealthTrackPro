import axios from 'axios';
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import MyAppBar from "../components/AppBar";
import Box from '@mui/material/Box';
import NavDrawer from "../components/NavDrawer";
import ProfilesPage from '../pages/ProfilesPage';
import SettingsPage from '../pages/SettingsPage';


export function App() {


  const [test, setTest] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3333/api")
      .then(response => setTest(response.data.message))
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <MyAppBar />
      <Box sx={{ display: 'flex' }}>
        <NavDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route
              path="/"
              element={<ProfilesPage />}
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
