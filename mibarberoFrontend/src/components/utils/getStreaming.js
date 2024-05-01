import {
    updatePlayingList,
    updatePlayingVideo,
} from "../../store/slices/player.slice";
import getConfig from "./getConfig";
import axios from "axios";

const getStreaming = (userId, dispatch) => {
    const isLogged = localStorage.getItem("token");
    if (isLogged) {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/playlist/streaming/${userId}`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                dispatch(updatePlayingList(res.data));
                dispatch(
                    updatePlayingVideo(
                        res.data.videos?.filter(
                            (video) => video.playing == true
                        )
                    )
                );
            })
            .catch((err) => console.log(err));
    } else {
        return null;
    }
};

export default getStreaming;
