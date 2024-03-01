import ProfileList from "../components/ProfileList";
import { Button } from "@mui/material";

function ProfilesOverviewPage() {

    return <div>
        <ProfileList />
        <Button variant="contained">Add Profile</Button>
    </div>
}

export default ProfilesOverviewPage;