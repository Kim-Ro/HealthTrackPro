import useProfilesContext from "../hooks/useProfilesContext";
import ProfileCard from "./ProfileCard";
import Grid from '@mui/material/Unstable_Grid2';
import { Link as RouterLink } from 'react-router-dom';


function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile, index) => {
        const path = "profile/" + profile._id;
        console.log("profile passed to card:" + profile._id);
        return <Grid component={RouterLink} to={path} underline="none" sx={{ textDecoration: "none" }}>
            <ProfileCard item xs="auto" key={index} profile={profile} underline="none" />
        </Grid>
    });

    return <Grid container spacing={4}>
        {renderedProfiles}
    </Grid>;
}

export default ProfileList;