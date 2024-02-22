import useProfilesContext from "../hooks/useProfilesContext";

function ProfileList() {
    const { profiles } = useProfilesContext();

    const renderedProfiles = profiles.map((profile) => {
        return <div>
            <p>Profile Name: {profile.name}</p>
            <p>Sex: {profile.sex}</p>
            <p>Date of birth: {profile.dateOfBirth}</p>
        </div>;
    });

    return <div>
        {renderedProfiles}
    </div>;
}

export default ProfileList;