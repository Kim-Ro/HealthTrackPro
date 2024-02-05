import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://stripedsquad:O9D9hyPXcjMmWhVC@checkup-app.koiavjz.mongodb.net/checkup-db?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connection to MongoDb Atlas successful!")
    })
    .catch(err => {
        console.log("An error occured!")
        console.log(err)
    })


//// profile schema
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    availableCheckups: {
        type: mongoose.Schema.Types.ObjectId
    }

})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = mongoose.model("Profile", profileSchema);


// const testProfile = new Profile({
//     name: "Bernd das Brot",
//     sex: "male",
//     dateOfBirth: ("2000-9-2"),
// })

// testProfile.save().then((res) => { console.log(res) })


// function getAge(year, month, day) {
//     const birth = new Date(year, month - 1, day)
//     const now = new Date()
//     const diff = new Date(now.valueOf() - birth.valueOf())
//     const age = Math.abs(diff.getFullYear() - 1970)
//     return age
// }


// app.get("/api/newProfile", (req, res) => {
//     const { name, sex, dateOfBirth } = req.body;
//     const { year, month, day } = dateOfBirth.split("-");
//     const age = getAge(year, month, day);
//     const newProfile = new Profile({
//         name: name,
//         sex: sex,
//         dateOfBirth: dateOfBirth,
//         age: age
//     })
//     newProfile.save()
//     res.send("Successful!")
// })




// todo:
// -> find out how DOB data arrives at backend (as string!!!)
// -> build function to create a new profile and calculate age => save everything to db
// -> query checkups-db with age and sex of profile, then add valid checkups to profile-db

