import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import useProfilesContext from "../hooks/useProfilesContext";

export default function ProfilePage() {

    const { profileId } = useParams();
    const { profiles } = useProfilesContext();

    console.log(profiles);

    const currentProfile = profiles.find((profile) => profile._id == profileId);
    console.log(currentProfile);

    return <div>
        <p>{profileId}</p>
        {/* <p>{currentProfile.name}</p>
        <p>{currentProfile._id}</p> */}
    </div>
};