import express from 'express';
import * as path from 'path';
import cors from 'cors';
import CheckUp from './models/checkup-model';
import User from "./models/user-model";
const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//// workspace begin //////

//functions
const getAge = function (dateOfBirth) {
  const [year, month, day] = dateOfBirth.split('-');
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  const diff = new Date(now.valueOf() - birth.valueOf());
  const age = Math.abs(diff.getFullYear() - 1970);
  return age;
};

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
  });
  await user.save();
  return user;
};

const getCheckups = async function (profile) {
  const checkups = await CheckUp.find({ "sex": profile.sex, "age.min": { $lte: profile.age }, "age.max": { $not: { $lt: profile.age } } });
  return checkups;
};


// POST request to create new databankuser + first profile
app.post("/api/newUser", async (req, res) => {
  try {
    const { userAuthID, name, sex, dateOfBirth } = req.body;
    const age = getAge(dateOfBirth);
    const user = await createUser(userAuthID, name, sex, dateOfBirth, age);
    const profile = user.profiles[0];
    const checkups = await getCheckups(profile);
    for (const element of checkups) {
      user.profiles.id(profile._id).availableCheckups.push(element._id);
    }
    await user.save();
    res.send({ message: "New user created!" });
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
});

// GET request to fetch user data with all existing profiles
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
        const checkups = await getCheckups(profile);
        for (const element of checkups) {
          profile.availableCheckups.push(element._id);
        }
      }
    }
    await user.save();
    res.send(user);
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
});

//GET request to fetch data for specific profile
app.get("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const profile = user.profiles.id(profileID);
    await user.populate("profiles.availableCheckups");
    res.send(profile);
  }
  catch (err) {
    console.log("Something went wrong", err);
    res.send({ message: "Something went wrong." });
  }
});

//POST request to create new profile in databank user
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
    };
    const checkups = await getCheckups(newProfile);
    for (const element of checkups) {
      newProfile.availableCheckups.push(element._id);
    }
    user.profiles.push(newProfile);
    await user.save();
    res.send({ message: "New profile created!" });
  }
  catch (err) {
    console.log("Something went wrong.", err);
    res.send({ message: "Something went wrong." });
  }
});


//PUT request to update databank user name (does NOT update user account from registration!)
app.put("/api/user/:userAuthID", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const { newUserName } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    user.name = newUserName;
    await user.save();
    res.send({ message: "User updated!" });
  }
  catch (err) {
    console.log("Something went wrong.", err);
    res.send({ message: "Something went wrong." });
  }
});

//PUT request to update data for specific profile
app.put("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const { newName, newSex, newDateOfBirth } = req.body;
    const user = await User.findOne({ "userAuthID": userAuthID });
    const profile = user.profiles.id(profileID);
    if (profile.name !== newName) {
      profile.name = newName;
    };
    if (profile.sex !== newSex) {
      profile.name = newSex;
    };
    if (profile.dateOfBirth !== newDateOfBirth) {
      profile.dateOfBirth = newDateOfBirth;
      const age = getAge(newDateOfBirth);
      profile.age = age;
    };
    profile.availableCheckups = [];
    const checkups = await getCheckups(profile);
    for (const element of checkups) {
      profile.availableCheckups.push(element._id);
    }
    await user.save();
    res.send({ message: "Profile updated!" });
  }
  catch (err) {
    console.log("Something went wrong.", err);
    res.send({ message: "Something went wrong." });
  }
});

//DELETE request to delete databank user with all existing profiles. Does NOT delete user account from registration!
app.delete("/api/user/:userAuthID", async (req, res) => {
  try {
    const { userAuthID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    await User.findByIdAndDelete(user._id);
    res.send({ message: "Your User was deleted, it is no more!" });
  }
  catch (err) {
    console.log("Something went wrong.", err);
    res.send({ message: "Something went wrong!" });
  }
});

//DELETE request to delete a specific profile
app.delete("/api/user/:userAuthID/profiles/:profileID", async (req, res) => {
  try {
    const { userAuthID, profileID } = req.params;
    const user = await User.findOne({ "userAuthID": userAuthID });
    await user.profiles.id(profileID).deleteOne();
    await user.save();
    res.send({ message: "Profile deleted." });
  }
  catch (err) {
    console.log("Something went wrong.", err);
    res.send({ message: "Something went wrong!" });
  }
});


///// workspace end //////


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
