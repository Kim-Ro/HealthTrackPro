import { Card, CardContent, CardActionArea, CardMedia, CardActions, Typography, Button } from "@mui/material";
import avatarMale from "../images/avatar_male.png";
import avatarFemale from "../images/avatar_female.png";
import useProfilesContext from '../hooks/useProfilesContext';
import ProfileEdit from "./ProfileEdit";
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function ProfilesCard({ profile, isAdd, onAdd }) {

    const location = useLocation().pathname;
    let path = null;
    if (location == "/") {
        path = "profile/" + profile._id;
    }

    const [showEdit, setShowEdit] = useState(isAdd);

    // mock placeholder images
    let imagePlaceholder = avatarMale;
    if (profile.sex == "female") {
        imagePlaceholder = avatarFemale
    }

    // operations
    const { deleteProfileById } = useProfilesContext();

    const handleDeleteClick = () => {
        deleteProfileById(profile._id);
    }

    const handleEditClick = (event) => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = () => {
        setShowEdit(false);
        if (isAdd) { onAdd() };
    }

    //rendering
    //TODO: only add CardActionArea on OverviewPage OR display profile data differently on ProfilePage
    let content = <div>
        <CardActionArea component={RouterLink} to={path} sx={{ textDecoration: "none" }}>
            <CardMedia
                component="img"
                alt="profile image"
                height="240"
                src={imagePlaceholder} />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div" >{profile.name}</Typography>
                <Typography gutterBottom variant="body2" component="div">{profile.sex}</Typography>
                <Typography gutterBottom variant="body2" component="div">{profile.dateOfBirth}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" variant="outlined" onClick={handleEditClick}>Edit</Button>
            <Button size="small" variant="outlined" color="error" onClick={handleDeleteClick} component={RouterLink} to="/">Delete</Button>
        </CardActions></div>;

    if (showEdit) {
        content = <div>
            <CardMedia
                component="img"
                alt="profile image"
                height="240"
                src={imagePlaceholder} />
            <CardContent>
                <ProfileEdit profile={profile} onSubmit={handleSubmit} isAdd={isAdd} />
            </CardContent>
            <CardActions><Button variant="text" onClick={handleSubmit}>Cancel</Button></CardActions>
        </div>
    }

    let mt = isAdd ? 4 : 0;
    return <Card sx={{ maxWidth: 320, mt: mt }}>
        {content}
    </Card >
}