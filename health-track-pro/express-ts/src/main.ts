import express from 'express';
import * as path from 'path';
import cors from 'cors';
import CheckUp from './models/checkup-model';
import User from "./models/user-model";
const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//// workspace begin //////

//// CREATE: create a new user with first profile, calculate age, add eligible checkups //////

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

const getCheckups = async function (userAuthID, profileID) {
  const user = await User.findOne({ "userAuthID": userAuthID });
  const profile = user.profiles.id(profileID);
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
  await getCheckups(userAuthID, profileID);
  await user.save()
}

// Create new user, including first profile + available checkups

app.post("/api/newUser", async (req, res) => {
  try {
    const { userAuthID, name, sex, dateOfBirth } = req.body;
    await newUser(userAuthID, name, sex, dateOfBirth);
    res.send({ message: "New user created!" });
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
})

//Look at user with all existing profiles + automatic update

app.get("/api/user/:userAuthID/profiles", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const profiles = user.profiles;
    for (const profile of profiles) {
      const age = getAge(profile.dateOfBirth);
      if (profile.age !== age) {
        profile.age = age;
        profile.availableCheckups = [];
        const checkups = await CheckUp.find({ "sex": profile.sex, "age.min": { $lte: profile.age }, "age.max": { $not: { $lt: profile.age } } });
        for (const element of checkups) {
          profile.availableCheckups.push(element._id);
        }
      }
    }
    await user.save()
    res.send(user.profiles)
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
})

//Fetch specific profile from user account 

app.get("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const profile = user.profiles.id(profileID);
    await user.populate("profiles.availableCheckups");
    res.send(profile)
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
})

//Create a new profile in user account

app.post("/api/user/:userAuthID/profiles", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const { name, sex, dateOfBirth } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const age = getAge(dateOfBirth);
    const newProfile = {
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirth,
      age: age,
      availableCheckups: []
    }
    const checkups = await CheckUp.find({ "sex": sex, "age.min": { $lte: age }, "age.max": { $not: { $lt: age } } });
    for (const element of checkups) {
      newProfile.availableCheckups.push(element._id);
    }
    user.profiles.push(newProfile);
    await user.save();
    res.send({ message: "New profile created!" });
  }
  catch (err) {
    console.log("Something went wrong.", err)
    res.send({ message: "Something went wrong." })
  }
})


// update user
app.patch("/api/user/:userAuthID", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const { newUserName } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    user.name = newUserName;
    await user.save()
    res.send({ message: "User updated!" })
  }
  catch (err) {
    console.log("Something went wrong.", err)
    res.send({ message: "Something went wrong." })
  }
})

// update profile
app.patch("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const { newName, newSex, newDateOfBirth } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const profile = user.profiles.id(profileID);
    if (profile.name !== newName) {
      profile.name = newName
    };
    if (profile.sex !== newSex) {
      profile.name = newSex
    };
    if (profile.dateOfBirth !== newDateOfBirth) {
      profile.dateOfBirth = newDateOfBirth
      const age = getAge(newDateOfBirth)
      profile.age = age
    };
    profile.availableCheckups = [];
    const checkups = await CheckUp.find({ "sex": profile.sex, "age.min": { $lte: profile.age }, "age.max": { $not: { $lt: profile.age } } });
    for (const element of checkups) {
      profile.availableCheckups.push(element._id);
    }
    await user.save()
    res.send({ message: "Profile updated!" })
  }
  catch (err) {
    console.log("Something went wrong.", err)
    res.send({ message: "Something went wrong." })
  }
})

//delete user
app.delete("/api/user/:userAuthID", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    await User.findByIdAndDelete(user._id);
    res.send({ message: "Your User was deleted, it is no more!" })
  }
  catch (err) {
    console.log("Something went wrong.", err)
    res.send({ message: "Something went wrong!" })
  }
})

//delete selected profile
app.delete("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    await user.profiles.id(profileID).deleteOne()
    await user.save()
    res.send({ message: "Selected Profile was deleted" })
  }
  catch (err) {
    console.log("Something went wrong.", err)
    res.send({ message: "Something went wrong!" })
  }
})


///// workspace end //////


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
