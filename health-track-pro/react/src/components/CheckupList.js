import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function CheckupList({ checkups }) {

    if (checkups != null && checkups != undefined) {

        const renderedCheckups = checkups.map((checkup) => {
            return (
                <div key={checkup._id}><ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <MonitorHeartIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={checkup.name} secondary={checkup.description} />
                </ListItem>
                    <Divider /></div>
            );
        });

        return <List>{renderedCheckups}</List>
    }
}