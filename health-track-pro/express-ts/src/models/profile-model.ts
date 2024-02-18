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
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"},
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
    availableCheckups: 
        [{type: mongoose.Schema.Types.ObjectId, 
        ref: "CheckUp"}]
})

const Profile = mongoose.model("Profile", profileSchema);
 
export default Profile;


// const testProfile = new Profile({
//     name: "Bernd das Brot",
//     sex: "male",
//     dateOfBirth: ("2000-9-2"),
// })

// testProfile.save().then((res) => { console.log(res) })


// todo:
// -> find out how DOB data arrives at backend (as string!!!)
// -> build function to create a new profile and calculate age => save everything to db
// -> query checkups-db with age and sex of profile, then add valid checkups to profile-db

