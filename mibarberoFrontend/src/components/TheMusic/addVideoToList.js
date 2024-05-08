// addVideoToList.js

import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../utils/getConfig";
import { updatePlayingList } from "../../store/slices/player.slice";

const addVideoToList = (listId, videoId, dispatch) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/addvideo`;
    const data = {
        playListId: listId,
        videoId: videoId,
    };

    axios
        .post(URL, data, getConfig())
        .then((res) => {
            dispatch(updatePlayingList(res.data.youtubeData)); // Dispatch dentro de la función asincrónica
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: "Video Agregado",
            });
        })
        .catch((err) => {
            console.log(err);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "error",
                title: `Hubo un error, ${err.response.data.err}`,
            });
        });
};

export default addVideoToList;
