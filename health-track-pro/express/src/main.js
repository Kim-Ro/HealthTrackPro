/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import checkup from "./models/checkup-model.js"
const app = express();
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//// workspace begin //////


app.get('/api', (req, res) => {
  checkup.find({"age.min":{$lte:34}, "age.max":{$gte:34}})
  .then((result) => {
    res.send(result);
  })
});








///// workspace end //////

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
