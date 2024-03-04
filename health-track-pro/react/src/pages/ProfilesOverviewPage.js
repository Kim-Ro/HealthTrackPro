import useProfilesContext from "../hooks/useProfilesContext";
import ProfileList from "../components/ProfileList";
import { Button, Typography } from "@mui/material";


//TODOs
// (1) when editing the profile, the ProfileOverviewPage doesn't refresh and still shows the old data
// (2) when creating a new profile, the card is created but doesn't show any data
// (3) when using edit from this page, the app navigates to the single profile page
// (4) when deleting a profile, the app navigates to the single profile page and throws errors
// probably something with state management
// need to handle that navigation updates for a deleted profile, so that users cannot go there anymore, and also what to display in case of "profile not found"


function ProfilesOverviewPage() {

    const { createProfile, stableFetchProfiles } = useProfilesContext();


    const handleClick = () => {
        // fix: when creating, Profile list is not updated with data
        createProfile("Micky Mouse", "male", "1970-01-01") //dummy profile for testing
    }

    return <div>
        <Typography variant="h4" component="h1" mb={2}>Profiles</Typography>
        <ProfileList />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleClick}>Add Profile</Button>
    </div>
}

export default ProfilesOverviewPage;