import { Card, CardContent, CardMedia, CardActions, Typography, Button } from "@mui/material";
import avatarMale from "../images/avatar_male.png";
import avatarFemale from "../images/avatar_female.png";
import useProfilesContext from '../hooks/useProfilesContext';
import ProfileEdit from "./ProfileEdit";
import { useState } from 'react';

export default function ProfilesCard({ profile }) {

    const [showEdit, setShowEdit] = useState(false);
    // console.log("showEdit is: " + showEdit);

    // mock placeholder images
    let imagePlaceholder = avatarMale;
    if (profile.sex == "female") {
        imagePlaceholder = avatarFemale
    }

    // operations
    const { deleteProfileById } = useProfilesContext();

    const handleDeleteClick = () => {
        // disabled bc frontend not updated correctly
        deleteProfileById(profile._id);
    }

    const handleEditClick = (event) => {
        console.log("edit was pressed");
        console.log(event);
        setShowEdit(!showEdit);
    }

    const handleSubmit = () => { //still needs to be passed down so that it knows when to hide BookEdit
        setShowEdit(false);
        // console.log("ProfileEdit form submitted in Profile Card")
    }

    let content = <div><CardMedia
        component="img"
        alt="profile image"
        height="240"
        src={imagePlaceholder} />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" >{profile.name}</Typography>
            <Typography gutterBottom variant="body2" component="div">{profile.sex}</Typography>
            <Typography gutterBottom variant="body2" component="div">{profile.dateOfBirth}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant="outlined" onClick={handleEditClick}>Edit</Button>
            <Button size="small" variant="outlined" color="error" onClick={handleDeleteClick}>Delete</Button>
        </CardActions></div>;

    if (showEdit) {
        content = <div>
            <CardMedia
                component="img"
                alt="profile image"
                height="240"
                src={imagePlaceholder} />
            <CardContent>
                <ProfileEdit profile={profile} onSubmit={handleSubmit} />
            </CardContent>
        </div>
    }
    return <Card sx={{ maxWidth: 320 }}>
        {content}
    </Card >
}