import NxWelcome from './nx-welcome';
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import axios from "axios";
import MyAppBar from "../components/AppBar";
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

    axios.get('http://localhost:3333/auth/profile', { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setUserProfile({
            isAuthenticated: true,
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
      <MyAppBar isAuthenticated={userProfile.isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <p>
        <h1>
          {userProfile.isAuthenticated && `Hello, ${userProfile.user.nickname}`}
        </h1>
      </p>
      <div role="navigation">
        <ul>
            <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
          <li>{test}</li>
          <li>{authStatus}</li> {/* Display the authentication status */}
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}
export default App;
