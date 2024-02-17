import express from 'express';
import * as path from 'path';
import cors from 'cors';
import CheckUp from './models/checkup-model.js';
import User from "./models/user-model.js";
const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


///// BACKEND SWITCHED TO TYPESCRIPT (SEE MAIN.TS EXPRESS-TS FOLDER) //////
///// THIS FILE IS NOT UP TO DATE /////

const getAge = function (dateOfBirth) {
  const [year, month, day] = dateOfBirth.split('-');
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  const diff = new Date(now.valueOf() - birth.valueOf());
  const age = Math.abs(diff.getFullYear() - 1970);
  return age;
}

const createUser = async function (userAuthID, name, sex, dateOfBirth, age) {
  const user = new User({
    userAuthID: userAuthID,
    name: name,
    profiles: {
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirth,
      age: age
    }
  })
  await user.save();
  return user;
}

const getCheckups = async function (userID, profileID) {
  const user = await User.findOne({ "_id": userID });
  const profile = await user.profiles.id(profileID);
  const age = profile.age;
  const sex = profile.sex;
  const checkups = await CheckUp.find({ "sex": sex, "age.min": { $lte: age }, "age.max": { $not: { $lt: age } } });
  for (const element of checkups) {
    profile.availableCheckups.push(element._id);
  }
  await user.save();
}

const newUser = async function (userAuthID, name, sex, dateOfBirth) {
  const age = getAge(dateOfBirth);
  const user = await createUser(userAuthID, name, sex, dateOfBirth, age);
  const userID = user._id;
  const profileID = user.profiles[0]._id;
  await getCheckups(userID, profileID);
}

// Create new user, including first profile + available checkups

app.post("/api/newUser", async (req, res) => {
  try {
    const { userAuthID, name, sex, dateOfBirth } = req.body;
    await newUser(userAuthID, name, sex, dateOfBirth)
    res.send({ message: "New user created!" })
  }
  catch (err) {
    console.log("Something went wrong", err)
    res.send({ message: "Something went wrong." })
  }
})

//Look at user with all existing profiles

app.get("/api/user/:userAuthID/profiles", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID })
    console.log(user)
    res.send(user.profiles)
  }
  catch (err) {
    console.log("Something went wrong", err)
    res.send({ message: "Something went wrong." })
  }
})

//Fetch specific profile from user account

app.get("/api/user/:userID/profiles/:profileID", async (req, res) => {
  try {
    const { userID, profileID } = req.params;
    const user = await User.findOne({ "_id": userID })
    const profile = await user.profiles.id(profileID)
      .then(res.send(profile))
  }
  catch (err) {
    console.log("Something went wrong", err)
    res.send({ message: "Something went wrong." })
  }
})

//Create a new Profile in your User Account

app.post("/api/user/:userAuthID/profiles", async (req, res) => {
  try {
    const { userAuthID } = req.params
    const { name, sex, dateOfBirth } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const age = getAge(dateOfBirth);
    const newProfile = {
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirth,
      age: age
    }
    await user.profiles.push(newProfile);
    await user.save();
    const userID = user._id
    const newProfileID = newProfile._id;
    console.log(userID, newProfileID)
    await getCheckups(userID, newProfileID)
  }
  catch (err) {
    console.log("No profile was created", err)
    res.send({ message: "No profile was created, please try again!" })
  }
})

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

///// workspace end //////

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
