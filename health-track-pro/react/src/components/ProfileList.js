import useProfilesContext from "../hooks/useProfilesContext";
import ProfileCard from "./ProfileCard";
import Grid from '@mui/material/Unstable_Grid2';


function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile, index) => {
        return <Grid><ProfileCard item xs="auto" key={index} profile={profile} isAdd={false} underline="none" /></Grid>
    });

    return <Grid container spacing={4}>
        {renderedProfiles}
    </Grid>;
}

export default ProfileList;