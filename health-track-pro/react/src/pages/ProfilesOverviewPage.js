import useProfilesContext from "../hooks/useProfilesContext";
import ProfileList from "../components/ProfileList";
import ProfileCard from "../components/ProfileCard";
import { Button, Typography } from "@mui/material";
import { useState } from 'react';


export default function ProfilesOverviewPage() {

    const [showAdd, setShowAdd] = useState(false);

    const emptyProfile = { _id: 0, name: "", sex: "male", dateOfBirth: "1970-01-01" }

    const handleAddClick = () => {
        setShowAdd(!showAdd);
    }

    const onAdd = () => {
        setShowAdd(false);
    }

    if (showAdd) {
        return <div>
            <Typography variant="h4" component="h1" mb={2}>Profiles</Typography>
            <ProfileList />
            <ProfileCard item xs="auto" key="emptyProfile" profile={emptyProfile} isAdd={true} onAdd={onAdd} underline="none" />
        </div>
    } else {
        return <div>
            <Typography variant="h4" component="h1" mb={2}>Profiles</Typography>
            <ProfileList />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddClick}>Add Profile</Button>
        </div>
    }
}