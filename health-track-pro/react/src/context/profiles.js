import { createContext, useState, useCallback } from "react";
import axios from "axios";

const ProfilesContext = createContext();

function Provider({ children }) {
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = useCallback(async () => {
        const response = await axios
            .get("http://localhost:3333/api/user/profiles")
            .then(response => { setProfiles(response.data); console.log(response.data) })
            .catch(error => console.log(error));
    }, []);

    const createProfile = async (name, sex, dateOfBirth) => {
        const response = await axios.post("http://localhost:3333/api/user/profiles/newProfile", {
            name, sex, dateOfBirth,
        });

        const updatedProfiles = [
            ...profiles, response.data];
        setProfiles(updatedProfiles);
    };

    const updateProfileById = async (id, newName, newSex, newDateOfBirth) => {
        const response = await axios.put("http://localhost:3333/api/user/profiles/" + id + "/edit", {
            newName: newName,
            newSex: newSex,
            newDateOfBirth: newDateOfBirth
        });

        const updatedProfiles = profiles.map((profile) => {
            if (profile.id === id) {
                return { ...profile, ...response.data };
            }
            return profile;
        });
        setProfiles(updatedProfiles);
    };

    const deleteProfileById = async (id) => {
        axios.delete("http://localhost:3333/api/user/profiles/" + id + "/delete")

        const updatedProfiles = profiles.filter((profile) => {
            return profile.id !== id;
        });
        setProfiles(updatedProfiles);
    };


    const valueToShare = {
        profiles,
        fetchProfiles,
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