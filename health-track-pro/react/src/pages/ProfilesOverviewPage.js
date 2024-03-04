import useProfilesContext from "../hooks/useProfilesContext";
import ProfileList from "../components/ProfileList";
import { Button, Typography } from "@mui/material";

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