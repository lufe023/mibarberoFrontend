import axios from "axios";
import getConfig from "../utils/getConfig";
import { updateUserPlaylists } from "../../store/slices/player.slice";

const getUserPlayists = (dispatch) => {
    const isLogged = localStorage.getItem("token");
    if (isLogged) {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                dispatch(updateUserPlaylists(res.data));
            })
            .catch((err) => console.log(err));
    } else {
        return null;
    }
};

export default getUserPlayists;
