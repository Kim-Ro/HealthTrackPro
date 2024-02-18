import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://stripedsquad:O9D9hyPXcjMmWhVC@checkup-app.koiavjz.mongodb.net/checkup-db?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connection to MongoDb Atlas successful!")
    })
    .catch(err => {
        console.log("An error occured!")
        console.log(err)
    })


const ageSchema = new mongoose.Schema({
    min: Number,
    max: Number,
})

///////// New schema, resulting in 11 entries of which some have the exact same name, but easier to query! //////////
const checkupSchema = new mongoose.Schema({
    name: String,
    sex: [String],
    age: ageSchema,
    description: String,
    isRepeated: Boolean,
    repetitionInYears: Number,
    specialConditions: String,
})

const CheckUp = mongoose.model("CheckUp", checkupSchema);

export default CheckUp;



////////////////    DATA ENTRIES VERSION 2, resulting in 11 db entries       /////////////////

// CheckUp.insertMany([
//     {name:"Check Up 18", description:"Anamnesis and physical examination in order to detect early signs of cardiovascular diseases or diabetes", gender:["male", "female"], age: {min: 18, max:35}, isRepeated:false, specialConditions:"Can only be done once."},
//     {name:"Cervical and Genital Cancer Screening", description:"Gynecological examination and pap smear", gender:["female"], age: {min: 20, max:34}, isRepeated:true, repetitionInYears:1},
//     {name:"Cervical and Genital Cancer Screening", description:"Gynecological examination, pap smear and testing for HPV",gender:["female"], age: {min: 35}, isRepeated:true, repetitionInYears:3},
//     {name:"Breast Cancer Screening", description:"Physical examination of breast tissue and regional lymph nodes", gender:["female"], age: {min: 30}, isRepeated:true, repetitionInYears:1},
//     {name:"Breast Cancer Screening", description:"Mammography screening", gender:["female"], age: {min: 50, max:70}, isRepeated:true, repetitionInYears:2},
//     {name:"Check Up 35", description:"Anamnesis, physical examination, urine testing and blood analysis of cholesterol and blood sugar levels in order to detect signs of cardiovascular diseases or diabetes", gender:["male", "female"], age: {min: 35}, repetition:true, repetitionInYears:3, specialConditions:"Option fo screen for hepatitis B and C once."},
//     {name:"Skin Cancer Screening", description:"Visual examination of the skin", gender:["male", "female"], age: {min: 35}, isRepeated:true, repetitionInYears:2},
//     {name:"Prostate and Genital Cancer Screening", description:"Examination of outer genitals and regional lymph nodes, plus examination of prostate", gender:["male"], age: {min: 45}, isRepeated:true, repetitionInYears:1},
//     {name:"Colon Cancer Screening", description:"Faecal occult blood testing", gender:["male", "female"], age: {min: 50, max:54}, isRepeated:true, repetitionInYears:1},
//     {name:"Colon Cancer Screening", description:"Colonoscopy", gender:["male"], age: {min: 50}, isRepeated:true, repetitionInYears:10, specialConditions:"Can be chosen as alternative to faecal occult blood testing."},
//     {name:"Abdominal Aortic Aneurysm Screening", description:"Ultrasound of abdominal aorta", gender:["male"], age: {min: 65}, isRepeated:false, specialConditions:"Can only be done once."}
//     ])
// .then(() => {
//     console.log("successfully integrated data")
// })
// .catch((e) =>{
//     console.log("something went wrong")
//     console.log(e)
// })


/////////////////////   below: example how to access database   ///////////////////

// CheckUp.find({"age.min":{$lte:34}, "age.max":{$gte:34}})
// .then((res) => {
//     console.log(res)
// })

