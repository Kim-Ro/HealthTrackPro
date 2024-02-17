import mongoose from 'mongoose';
// const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://stripedsquad:O9D9hyPXcjMmWhVC@checkup-app.koiavjz.mongodb.net/checkup-db?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connection to MongoDb Atlas successful!")
    })
    .catch(err => {
        console.log("An error occured!")
        console.log(err)
    })

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
        type: Number,
        required: true
    },
    availableCheckups:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CheckUp",
            _id: false
        }]
})

const userSchema = new mongoose.Schema({
    userAuthID: String,
    name: String,
    profiles: [profileSchema]
})

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema)


module.exports = mongoose.model("User", userSchema)