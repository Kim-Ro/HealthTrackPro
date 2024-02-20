import express from 'express';
import CheckUp from '../models/checkup-model';
import User from "../models/user-model";
const router = express.Router();


//functions
const getAge = function (dateOfBirth) {
    const [year, month, day] = dateOfBirth.split('-');
    const birth = new Date(year, month - 1, day);
    const now = new Date();
    const diff = new Date(now.valueOf() - birth.valueOf());
    const age = Math.abs(diff.getFullYear() - 1970);
    return age;
};

const getCheckups = async function (profile) {
    const checkups = await CheckUp.find({ "sex": profile.sex, "age.min": { $lte: profile.age }, "age.max": { $not: { $lt: profile.age } } });
    return checkups;
};

const getUser = function (req): { nickname: string, sub: string; } {
    if (req.oidc.isAuthenticated()) {
        return req.oidc.user;
    } else {
        return undefined;
    }
};

//routes

//POST request to create new profile in databank user
router.post("/newProfile", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
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

// GET request to fetch user data with all existing profiles + checks if age is still up to date
router.get("/", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
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
router.get("/:profileID", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
        const { profileID } = req.params;
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

//PUT request to update data for specific profile
router.put("/:profileID/edit", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
        const { profileID } = req.params;
        const { newName, newSex, newDateOfBirth } = req.body;
        const user = await User.findOne({ "userAuthID": userAuthID });
        const profile = user.profiles.id(profileID);
        if (profile.name !== newName) {
            profile.name = newName;
        };
        if (profile.sex !== newSex) {
            profile.sex = newSex;
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

//DELETE request to delete a specific profile
router.delete("/:profileID/delete", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
        const { profileID } = req.params;
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

export default router 