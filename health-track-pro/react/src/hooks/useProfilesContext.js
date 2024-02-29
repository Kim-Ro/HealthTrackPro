import { useContext } from "react";
import ProfilesContext from "../context/profiles";

function useProfilesContext() {
    return useContext(ProfilesContext);
}
export default useProfilesContext;