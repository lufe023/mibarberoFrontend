import axios from "axios";
import getConfig from "../utils/getConfig";
import {
    updatePlayingList,
    updatePlayingVideo,
} from "../../store/slices/player.slice";
import getUserPlayists from "./getUserPlayists";

const setPLay = (playListId, videoId, dispatch) => {
    const isLogged = localStorage.getItem("token");
    if (isLogged) {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/playlist/playingnow`;
        axios
            .put(
                URL,
                {
                    playListId,
                    videoId,
                },
                getConfig()
            )
            .then((res) => {
                getUserPlayists(dispatch);
                dispatch(updatePlayingList(res.data.youtubeData));
                dispatch(
                    updatePlayingVideo(
                        res.data.youtubeData.videos?.filter(
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

export default setPLay;
