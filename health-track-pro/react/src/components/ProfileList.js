import useProfilesContext from "../hooks/useProfilesContext";
import ProfileCard from "./ProfileCard";
import Grid from '@mui/material/Unstable_Grid2';

function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile) => { return <Grid><ProfileCard item xs="auto" key={profile._id} profile={profile} /></Grid> });

    return <Grid container spacing={4}>
        {renderedProfiles}
    </Grid>;
}

export default ProfileList;