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
const profileSchema = new Schema({
    name: {
        type: String,
        required: true},
    sex: {
        type: String,
        required: true},
    birthday: {
        type: Date,
        required: true}
})