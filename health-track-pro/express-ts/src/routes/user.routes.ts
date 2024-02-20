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

const createUser = async function (userAuthID, nickname) {
    const user = new User({
        userAuthID: userAuthID,
        name: nickname
    });
    await user.save()
    return user
}

const getUser = function (req): { nickname: string, sub: string; } {
    if (req.oidc.isAuthenticated()) {
        return req.oidc.user;
    } else {
        return undefined;
    }
};

// GET request to check if user already exists in databank, if not -> creates a user
router.get("/", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const user = await User.findOne({ "userAuthID": isAuth.sub });
        if (user == undefined) {
            const user = await createUser(isAuth.sub, isAuth.nickname);
            console.log(user)
            res.send({ message: `Hello, ${user.name}!` });
        }
        else {
            res.send({ message: `Welcome back, ${user.name}!` })
        }
    }
    catch (err) {
        console.log("Something went wrong", err);
        res.send({ message: "Something went wrong." });
    }
})

//PUT request to update databank user name (does NOT update user account from registration!)
router.put("/edit", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
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

//DELETE request to delete databank user with all existing profiles. Does NOT delete user account from registration!
router.delete("/delete", async (req, res) => {
    try {
        const isAuth = getUser(req);
        const userAuthID = isAuth.sub
        const user = await User.findOne({ "userAuthID": userAuthID });
        await User.findByIdAndDelete(user._id);
        res.send({ message: "User deleted, it is no more!" });
    }
    catch (err) {
        console.log("Something went wrong.", err);
        res.send({ message: "Something went wrong!" });
    }
});

export default router





// const createUser = async function (userAuthID, name, sex, dateOfBirth, age) {        //// OUTDATED
//     const user = new User({
//         userAuthID: userAuthID,
//         name: name,
//         profiles: {
//             name: name,
//             sex: sex,
//             dateOfBirth: dateOfBirth,
//             age: age
//         }
//     });
//     await user.save();
//     return user;
// };

// // POST request to create new databank user + first profile      //// OUTDATED
// router.post("/", async (req, res) => {
//     try {
//         const isAuth = getUser(req);
//         const userAuthID = isAuth.sub
//         const { name, sex, dateOfBirth } = req.body;
//         const age = getAge(dateOfBirth);
//         const user = await createUser(userAuthID, name, sex, dateOfBirth, age);
//         const profile = user.profiles[0];
//         const checkups = await getCheckups(profile);
//         for (const element of checkups) {
//             user.profiles.id(profile._id).availableCheckups.push(element._id);
//         }
//         await user.save();
//         res.send({ message: "New user created!" });
//     }
//     catch (err) {
//         console.log("Something went wrong", err);
//         res.send({ message: "Something went wrong." });
//     }
// });

