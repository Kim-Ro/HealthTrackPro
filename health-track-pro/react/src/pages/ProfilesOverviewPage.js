import ProfileList from "../components/ProfileList";
import { Button, Typography } from "@mui/material";

function ProfilesOverviewPage() {

    return <div>
        <Typography variant="h4" component="h1" mb={2}>Profiles</Typography>
        <ProfileList />
        <Button variant="contained" sx={{ mt: 2 }}>Add Profile</Button>
    </div>
}

export default ProfilesOverviewPage;