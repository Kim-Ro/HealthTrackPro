import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import CheckupList from "../components/CheckupList";
import axios from "axios";

export default function ProfilePage() {

    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);

    const fetchProfile = async (profileId) => {
        console.log("profileId in fetchProfile: " + profileId)
        const response = await axios
            .get("http://localhost:3333/api/user/profiles/" + profileId, { withCredentials: true })
            .then(response => { setProfile(response.data); })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchProfile(profileId);
    }, [profileId]);

    if (profile != null && profile != undefined) {
        return <div>
            <Typography variant="h4" component="h1" mb={2}>{profile.name}</Typography>
            <ProfileCard profile={profile}></ProfileCard>
            <CheckupList checkups={profile.availableCheckups}></CheckupList>
        </div >
    } else {
        return <Typography variant="h4" component="h1" mb={2}>Profile not found.</Typography>
    }
};