import { Card, CardContent, Typography } from "@mui/material";
export default function CheckupList({ checkups }) {

    if (checkups != null && checkups != undefined) {

        const renderedCheckups = checkups.map((checkup) => {
            return (
                <Card sx={{ maxWidth: 320 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >{checkup.name}</Typography>
                        <Typography gutterBottom variant="body1" component="div">{checkup.description}</Typography>
                        <Typography gutterBottom variant="body1" component="div">Available every {checkup.repetitionInYears} year(s)</Typography>
                    </CardContent>
                </Card>
            );
        });

        return <div>{renderedCheckups}</div>;
    }
}