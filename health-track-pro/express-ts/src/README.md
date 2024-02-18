////// ROUTING README //////


// USER SCHEMA in database //
    userAuthID: 1234567     // unique identifier for user from login
    name: "Max Mustermann"
    profiles: [
        {name: "Max Mustermann", sex: "male", dateOfBirth: "1985-10-05", age: 38, availableCheckups: [...], 
        _id: 2337283dsad34324}
        {name: "Marie Mustermann", sex: "female", dateOfBirth: "2005-05-06", age: 18, availableCheckups: [...], 
        _id: sdks34235424sdfd}
        {name: "Laura Mustermann", sex: "female", "dateOfBirth: "1986-09-28", age: 37, availableCheckups: [...],
        _id: 238fklsdflsd2039d}
        {...}
        ]
    
// CHECKUP SCHEMA in database //
    name: "Check Up"
    sex: ["male", "female"]
    age: {min: 18, max: 99}
    description: "string"
    isRepeated: true/false           //some checkups can only be done once
    repetitionInYears: 1             //repeated after 1 year, applies only if isRepeated is set to true
    specialConditions: "string"      //not applicable in every case




// ROUTES //

-> Routing all yet in one file, will be updated/improved.


// CREATE NEW USER // --> this will create a user + first profile

    POST (/api/user) 
        req.body = {
            userAuthID: 1234567     // Unique identifier from login
            name: "Max Mustermann"
            sex: "male"
            dateOfBirth: "1985-10-05"    // preferrable as string (for age calculation)
        }


// GET USER OVERVIEW WITH ALL PROFILES // --> automatically calculates age anew for each profile and updates checkups if age has changed. Returns entire user data + all existing profiles for user, but not all the checkup data.

    GET (/api/user/:userAuthID/profiles)
        req.params = {
            userAuthID: 1234567
        }


// GET SPECIFIC PROFILE // --> returns all data for that profile, including checkup data

    GET (/api/user/userAuthID/profiles/:profileID)
        req.params = {
            userAuthID: 1234567,
            profileID: 2kfls8202054029302901}        //unique identifier for the profile in the mongo database,
                                                    comes with each request for profile data (profile._id)


// CREATE NEW PROFILE FOR USER //

    POST (/api/user/:userAuthID/profiles)
        req.params = {userAuthID: 1234567}
        req.body = {
            name: "Marie Mustermann"
            sex: "female"
            dateOfBirth: 2005-05-06"
        }


// UPDATE USER // --> This does only change the name for the overall user, not the profiles

    PUT (/api/user/:userAuthID)
        req.params = {userauthID: 1234567}
        req.body = {newUserName: "Moritz Mustermann"}


// UPDATE A SPECIFIC PROFILE // --> This allows to change data for a specific profile. So far there is no option to leave fields empty, sorry! - If fields don't require change, just send the old value.

    PUT (/api/user/userAuthID/profiles/:profileID)
        req.params = {
            userAuthID: 1234567
            profileID: dska283782193798sdh284       // unique profile identifier from database
        }
        req.body = {
            newName: "Maria Mustermann"
        }

// DELETE A SPECIFIC PROFILE //

    DELETE (/api/user/:userAuthID/profiles/:profileID)
        req.params = {
            userAuthID: 123456, 
            profileID: sjd2736128ddsk282338
            }


// DELETE USER (IN DATABASE, NOT LOGIN) // --> deletes user with ALL existing profiles

    DELETE (/api/user/:userAuthID)
        req.params = {userAuthID: 1234567}
