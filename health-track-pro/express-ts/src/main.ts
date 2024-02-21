import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { auth } from "express-openid-connect";
import userRouter from "./routes/user.routes";
import profileRouter from "./routes/user-profiles.routes";
const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '5ca0f45719407ac21f42fff57c786da6c19fa8892c0d39d98d83a3890c8e9ae4',
  baseURL: 'http://localhost:3333',
  clientID: 'mA8smfK16nHmrI4FCUFHA9KMkZP7c0kR',
  issuerBaseURL: 'https://dev-77o1ter1ivw52d4h.us.auth0.com',
};

app.use(auth(config));

const getUser = function (req): { nickname: string, sub: string; } {
  if (req.oidc.isAuthenticated()) {
    return req.oidc.user;
  } else {
    return undefined;
  }
};

//middleware to check for authentification
app.use("/api/user", (req, res, next) => {
  const user = getUser(req);
  if (!user) {
    res.status(401).send({ message: "Authentification required." });
  }
  else {
    next();
  }
});
//

// middleware for routing
app.use("/api/user", userRouter);
app.use("/api/user/profiles", profileRouter);
//



//auth
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

// end auth

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
