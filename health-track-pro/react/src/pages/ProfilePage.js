import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from "../components/ProfileCard";
import CheckupList from "../components/CheckupList";
import axios from "axios";

export default function ProfilePage() {

    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);

    const fetchProfile = async (profileId) => {
        const response = await axios
            .get("http://localhost:3333/api/user/profiles/" + profileId, { withCredentials: true })
            .then(response => { setProfile(response.data); })
            .catch(error => console.log(error));
    };

    let dependencies = [profileId, 0, 0]
    if (profile != null) { dependencies.splice(1, 2, profile.sex, profile.dateOfBirth) }

    useEffect(() => {
        fetchProfile(profileId);
    }, dependencies);


    if (profile != null && profile != undefined) {
        return <div>
            <Typography variant="h4" component="h1" mb={2}>Available Checkups for {profile.name}</Typography>
            <Grid container spacing={8}>
                <Grid xs><CheckupList checkups={profile.availableCheckups}></CheckupList></Grid>
                <Grid xs="auto"><ProfileCard profile={profile}></ProfileCard></Grid>
            </Grid>
        </div >
    } else {
        return <Typography variant="h4" component="h1" mb={2}>Profile not found.</Typography>
    }
};