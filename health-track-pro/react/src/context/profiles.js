import { createContext, useState, useCallback } from "react";
import axios from "axios";

const ProfilesContext = createContext();

function Provider({ children }) {
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = useCallback(async () => {
        const response = await axios
            .get("http://localhost:3333/api/user/profiles", { withCredentials: true })
            .then(response => { setProfiles(response.data.profiles) })
            .catch(error => console.log(error));
    }, []);

    // stable references, returns the exact same function at rerenders
    const stableFetchProfiles = useCallback(fetchProfiles, []);

    const createProfile = async (name, sex, dateOfBirth) => {
        const response = await axios.post("http://localhost:3333/api/user/profiles/newProfile", {
            name, sex, dateOfBirth,
        }, { withCredentials: true });

        const updatedProfiles = [
            ...profiles, response.data];
        setProfiles(updatedProfiles);
    };

    const updateProfileById = async (id, newName, newSex, newDateOfBirth) => {
        const response = await axios.put("http://localhost:3333/api/user/profiles/" + id + "/edit", {
            newName: newName,
            newSex: newSex,
            newDateOfBirth: newDateOfBirth
        }, { withCredentials: true });

        const updatedProfiles = profiles.map((profile) => {
            if (profile.id === id) {
                return { ...profile, ...response.data };
            }
            return profile;
        });
        setProfiles(updatedProfiles);
    };

    const deleteProfileById = async (id) => {
        axios.delete("http://localhost:3333/api/user/profiles/" + id + "/delete", { withCredentials: true })

        const updatedProfiles = profiles.filter((profile) => {
            return profile.id !== id;
        });
        setProfiles(updatedProfiles);
    };


    const valueToShare = {
        profiles,
        fetchProfiles,
        stableFetchProfiles,
        createProfile,
        updateProfileById,
        deleteProfileById
    }

    return (
        <ProfilesContext.Provider value={valueToShare}>
            {children}
        </ProfilesContext.Provider>
    )
};

export default ProfilesContext;
export { Provider };