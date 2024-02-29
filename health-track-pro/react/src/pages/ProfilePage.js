import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import ProfilesContext from "../context/profiles";


export default function ProfilePage() {
    const { profileId } = useParams();
    console.log(profileId);

    return <div>{profileId}</div>
    // <ProfileCard profile={profile} />
};