import { useState } from "react";
import useProfilesContext from '../hooks/useProfilesContext';
import { Box, FormControl, InputLabel, OutlinedInput, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';

export default function ProfileEdit({ profile, onSubmit }) {
    const [newProfile, setNewProfile] = useState(profile);
    const { updateProfileById } = useProfilesContext();
    const [sex, setSex] = useState(profile.sex);

    const handleNameChange = (event) => {
        let changedProfile = newProfile;
        changedProfile.name = event.target.value;
        setNewProfile(changedProfile);
    };
    const handleSexChange = (event) => {
        setSex(event.target.value);
        let changedProfile = newProfile;
        changedProfile.sex = event.target.value;
        setNewProfile(changedProfile);
    };
    const handleDateChange = (event) => {
        let changedProfile = newProfile;
        changedProfile.dateOfBirth = event.target.value;
        setNewProfile(changedProfile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
        updateProfileById(newProfile._id, newProfile.name, newProfile.sex, newProfile.dateOfBirth);
    };

    return <Box component="form" onSubmit={handleSubmit}
        display="flex" flexDirection="column" gap={3} p={0}>
        <FormControl>
            <InputLabel htmlFor="nameInput">Name</InputLabel>
            <OutlinedInput id="nameInput" defaultValue={newProfile.name} label="Name" onChange={handleNameChange} />
        </FormControl>
        <ToggleButtonGroup
            color="primary"
            value={sex}
            exclusive
            onChange={handleSexChange}
            id="sexInput"
            aria-label="Sex"     >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
        </ToggleButtonGroup>
        <FormControl>
            <InputLabel htmlFor="dateInput">Date of Birth</InputLabel>
            <OutlinedInput id="dateInput" defaultValue={newProfile.dateOfBirth} label="Date of Birth" onChange={handleDateChange} />
        </FormControl>
        <Button variant="contained" type="submit">Save</Button>
    </Box>;

};