import NxWelcome from './nx-welcome';
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
export function App() {

  const [test, setTest] = useState();
  useEffect(() => {
    console.log(2)
    axios
      .get("http://localhost:3333/api")
      .then(response => setTest(response.data.message))
      .catch(error => console.log(error))
  }, []);


  return (
    <div>
      <p>{test}</p>
      <Button variant="contained">Hello world</Button>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
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
