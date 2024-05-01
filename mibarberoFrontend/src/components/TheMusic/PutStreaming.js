import getConfig from "../utils/getConfig";
import axios from "axios";

const putStreaming = (playListId, videoId, setPayingNow) => {
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
                setPayingNow(
                    res.data.youtubeData.videos?.filter(
                        (video) => video.playing == true
                    )
                );
            })
            .catch((err) => console.log(err));
    } else {
        return null;
    }
};

export default putStreaming;
