/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import checkup from "./models/checkup-model.js"
import Profile from "./models/profile-model.js"
const app = express();
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//// workspace begin //////


app.get('/api', (req, res) => {
  checkup.find({ "age.min": { $lte: 30 }, "age.max": { $gte: 30 } })
    .then((result) => {
      res.send(result);
    })
});

//// create a new profile, calculate age, add all data to database. IT WORKS //////
function getAge(year, month, day) {
  const birth = new Date(year, month - 1, day)
  const now = new Date()
  const diff = new Date(now.valueOf() - birth.valueOf())
  const age = Math.abs(diff.getFullYear() - 1970)
  return age
}

app.get("/api/newProfile", async (req, res) => {
  try {
    const { name, sex, dateOfBirth } = req.query;   ///see how data arrives from frontend. Maybe change to req.body if necessary /////
    const [year, month, day] = dateOfBirth.split("-");
    const age = getAge(year, month, day);
    const newProfile = new Profile({
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirth,
      age: age
    })
    await newProfile.save()
      .then(res.send("New profile created!"))
  }
  catch (err) {
    console.log("Something went wrong", err)
    res.send("Something went wrong!")
  }

})






///// workspace end //////

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
