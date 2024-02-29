import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import avatarMale from "../images/avatar_male.png";
import avatarFemale from "../images/avatar_female.png";

export default function ProfilesCard({ profile }) {

    let imagePlaceholder = avatarMale;

    if (profile.sex == "female") {
        imagePlaceholder = avatarFemale
    }

    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardMedia
                component="img"
                alt="profile image"
                height="240"
                src={imagePlaceholder}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{profile.name}</Typography>
                <Typography gutterBottom variant="body1" component="div">{profile.sex}</Typography>
                <Typography gutterBottom variant="body1" component="div">{profile.dateOfBirth}</Typography>
            </CardContent>
        </Card>
    );
}