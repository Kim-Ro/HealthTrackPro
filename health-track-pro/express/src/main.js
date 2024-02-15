/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';

const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '5ca0f45719407ac21f42fff57c786da6c19fa8892c0d39d98d83a3890c8e9ae4',
  baseURL: 'http://localhost:3333',
  clientID: 'mA8smfK16nHmrI4FCUFHA9KMkZP7c0kR',
  issuerBaseURL: 'https://dev-77o1ter1ivw52d4h.us.auth0.com',
  
  };


app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true, 
}));

app.use(auth(config));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Neustart nicht nötig!' });
});

app.get('/', (req, res) => {
  res.redirect('http://localhost:4200/');
});

app.get('/auth/status', (req, res) => {
  res.json({ isAuthenticated: req.oidc.isAuthenticated() });
});



app.get('/auth/profile', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.oidc.user
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);