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


// GET USER // --> this will fetch the user nickname saved in the database and greet the user. If no user exists, will automatically create one with the nickname provided by the authentification. Suitable as front page.

    GET ("/api/user") 


// UPDATE USERNAME // --> This updates the user name.

    PUT ("/api/user/edit")
        req.body = {newUserName: "Moritz Mustermann"}



// GET USER OVERVIEW WITH ALL PROFILES // --> automatically calculates age anew for each profile and updates checkups if age has changed. Returns entire user data + all existing profiles for user, but not all the checkup data.

    GET ("/api/user/profiles")


// GET SPECIFIC PROFILE // --> returns all data for that profile, including checkup data

    GET ("/api/user/profiles/:profileID")
        req.params = {
            profileID: 2kfls8202054029302901}        //unique identifier for the profile in the mongo database,
                                                    comes with each request for profile data (profile._id)


// CREATE NEW PROFILE FOR USER //

    POST (/api/user/profiles/newProfile)
        req.body = {
            name: "Marie Mustermann"
            sex: "female"
            dateOfBirth: 2005-05-06"        (If I checked correctly, then forms submit the DOB as string in format YYYY-MM-DD)
        }


// UPDATE A SPECIFIC PROFILE // --> This allows to change data for a specific profile. So far there is no option to leave fields empty, sorry! - If fields don't require change, just send the old value.

    PUT (/api/user/profiles/:profileID/edit)
        req.params = {
            profileID: dska283782193798sdh284       // unique profile identifier from database
        }
        req.body = {
            newName: "Maria Mustermann"
        }

// DELETE A SPECIFIC PROFILE //

    DELETE (/api/user/profiles/:profileID/delete)
        req.params = { 
            profileID: sjd2736128ddsk282338
            }


// DELETE USER (IN DATABASE, NOT LOGIN) // --> deletes user with ALL existing profiles

    DELETE (/api/user/delete)
