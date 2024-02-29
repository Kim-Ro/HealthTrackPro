import useProfilesContext from "../hooks/useProfilesContext";
import ProfileCard from "./ProfileCard";
import Grid from '@mui/material/Grid';

function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile) => {
        return <ProfileCard item xs="auto" key={profile._id} profile={profile} />
    });

    return <Grid container>
        {renderedProfiles}
    </Grid>;
}

export default ProfileList;