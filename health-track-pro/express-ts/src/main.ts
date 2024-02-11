/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import express from 'express';
import * as path from 'path';
import cors from 'cors';
import CheckUp from './models/checkup-model';
import User from "./models/user-model";
import { Document } from 'mongoose';
const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//// workspace begin //////

//// CREATE: create a new profile, calculate age, add all data to database. //////


const getAge = function (dateOfBirth) {
  const [year, month, day] = dateOfBirth.split('-');
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  const diff = new Date(now.valueOf() - birth.valueOf());
  const age = Math.abs(diff.getFullYear() - 1970);
  return age;
}

 const createUser = async function(userAuthID, name, sex, dateOfBirth, age){
  const user = new User({
    userAuthID: userAuthID,
    profiles: {
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirth,
      age: age
  }})
  await user.save();
  return user;
}

const getCheckups = async function (userID, profileID) {
const user = await User.findOne({"_id": userID});
const profile = user.profiles.id(profileID);
const age = profile.age;
const sex = profile.sex;
const checkups = await CheckUp.find({"sex": sex, "age.min": { $lte: age }, "age.max": { $gte: age }});
for (const element of checkups) {
  profile.availableCheckups.push(element._id)
}
}

const newUser = async function(userAuthID, name, sex, dateOfBirth) {
  const age = getAge(dateOfBirth);
  const user = await createUser(userAuthID, name, sex, dateOfBirth, age);
  const userID = user._id;
  const profileID = user.profiles[0]._id;
  await getCheckups(userID, profileID);
}


// app.get('/api/newProfile', async (req, res) => {
//   try {
//     const { name, sex, dateOfBirth } = req.query; ///see how data arrives from frontend. Maybe change to req.body if necessary /////
//     const age = getAge(dateOfBirth);
//     const availableCheckups = await CheckUp.find({"sex": sex, 'age.min': { $lte: age }, 'age.max': { $gte: age }})
//     console.log(availableCheckups)
//     await createProfile(name, sex, dateOfBirth, age, availableCheckups)
//     .then(res.send("New profile created!"))

//   } catch (err) {
//     console.log('Something went wrong', err);
//     res.send('Something went wrong!');
//   }
// });

////  READ -> access profile, see profile data and available checkups   ////////

////  UPDATE -> access profile, update data   /////////

//// DELETE -> delete data, delete profile /////////

///// workspace end //////


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
