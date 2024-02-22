import { useEffect, useContext } from "react";
import ProfilesContext from "../context/profiles";
import ProfileList from "../components/ProfileList";

function ProfilesPage({ userProfile }) {

    const { fetchProfiles } = useContext(ProfilesContext);

    useEffect(() => {
        fetchProfiles();
    }, []);

    return <div>
        <p>This is the profile page.</p>
        {userProfile.isAuthenticated && `Hello, ${userProfile.user.nickname}`}
        <ProfileList />
    </div>
}

export default ProfilesPage;