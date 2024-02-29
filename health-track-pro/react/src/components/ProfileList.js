import useProfilesContext from "../hooks/useProfilesContext";
import ProfileCard from "./ProfileCard";


function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile) => {
        return <ProfileCard key={profile._id} profile={profile} />
    });

    return <div>
        {renderedProfiles}
    </div>;
}

export default ProfileList;