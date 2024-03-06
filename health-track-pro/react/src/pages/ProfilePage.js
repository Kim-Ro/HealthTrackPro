import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import CheckupList from "../components/CheckupList";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {

    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);

    const fetchProfile = useCallback(async () => {
        console.log("profileId in fetchProfile: " + profileId)
        const response = await axios
            .get("http://localhost:3333/api/user/profiles/" + profileId, { withCredentials: true })
            .then(response => { setProfile(response.data); })
            .catch(error => console.log(error));
    }, []);

    const stableFetchProfile = useCallback(fetchProfile, []);

    useEffect(() => {
        stableFetchProfile();
    }, [profileId]);

    if (profile != null && profile != undefined) {
        return <div>
            <div>{profileId}</div>
            <Typography variant="h4" component="h1" mb={2}>{profile.name}</Typography>
            <ProfileCard profile={profile}></ProfileCard>
            <CheckupList checkups={profile.availableCheckups}></CheckupList>
        </div >
    } else {
        return <Typography variant="h4" component="h1" mb={2}>Profile not found.</Typography>
    }
};