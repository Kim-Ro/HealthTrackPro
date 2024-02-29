import { useEffect, useContext } from "react";
import ProfilesContext from "../context/profiles";
import ProfileList from "../components/ProfileList";
import { Button } from "@mui/material";

function ProfilesOverviewPage() {

    const { stableFetchProfiles } = useContext(ProfilesContext);

    useEffect(() => {
        stableFetchProfiles();
    }, []);

    return <div>
        <ProfileList />
        <Button variant="contained">Add Profile</Button>
    </div>
}

export default ProfilesOverviewPage;