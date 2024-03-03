import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import avatarMale from "../images/avatar_male.png";
import avatarFemale from "../images/avatar_female.png";

export default function ProfilesCard({ profile }) {

    let imagePlaceholder = avatarMale;
    if (profile.sex == "female") {
        imagePlaceholder = avatarFemale
    }

    const path = "profile/" + profile._id;

    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardActionArea component={RouterLink} to={path} underline="none">
                <CardMedia
                    component="img"
                    alt="profile image"
                    height="240"
                    src={imagePlaceholder}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >{profile.name}</Typography>
                    <Typography gutterBottom variant="body1" component="div">{profile.sex}</Typography>
                    <Typography gutterBottom variant="body1" component="div">{profile.dateOfBirth}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}