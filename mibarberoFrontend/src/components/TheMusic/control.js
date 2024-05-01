import { useState, useRef } from "react";

const useVideoControl = () => {
    const [playerStatus, setPlayerStatus] = useState(-1);
    const [volume, setVolume] = useState();

    const playerRef = useRef(null);

    const videoOnReady = (event) => {
        playerRef.current = event.target;
    };

    const videoOnStateChange = (event) => {
        setPlayerStatus(event.data);
    };

    const playVideo = () => {
        playerRef.current.playVideo();
    };

    const pauseVideo = () => {
        playerRef.current.pauseVideo();
    };

    const handleVolumeChange = (event) => {
        event.preventDefault();
        setVolume(event.target.value);
        if (playerRef.current) {
            playerRef.current.setVolume(event.target.value);
        }
    };

    return {
        videoOnReady,
        playVideo,
        pauseVideo,
        videoOnStateChange,
        handleVolumeChange,
        volume,
        setVolume,
        playerStatus,
        playerRef, // Ahora devolvemos playerRef
    };
};

export default useVideoControl;
