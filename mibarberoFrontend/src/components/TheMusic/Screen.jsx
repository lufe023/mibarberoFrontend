import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import useVideoControl from './control.js';
import Controls from './Controls.jsx';
import { useSelector } from 'react-redux';
import CTR from './CTR.jsx';

const Screen = ({ opts, setPayingNow }) => {

    let playingNow = useSelector(state => state.playerSlice.playingVideo)
    let straming = useSelector(state => state.playerSlice.playingList)

    const [index, setIndex] = useState()
    const [progress, setProgress] = useState(0); // Estado para el progreso del vídeo
    const [duration, setDuration] = useState('0:00'); // Estado para la duración del video
    const [seeking, setSeeking] = useState(false); // Estado para controlar si se está buscando

    const { videoOnReady, playVideo, pauseVideo, videoOnStateChange, playerStatus, handleVolumeChange, volume, playerRef } = useVideoControl(); // Accedemos a playerRef desde useVideoControl

      // Función para formatear el tiempo en minutos y segundos
      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    const handleOnReady = (event) => {
        videoOnReady(event);
        // Iniciar el intervalo para actualizar el progreso del vídeo
        const intervalId = setInterval(() => {
            if (!seeking && playerRef.current) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                setDuration(formatTime(duration))
                const progressPercent = (currentTime / duration) * 100;
                setProgress(progressPercent);
            }
        }, 1000); // Actualizar cada segundo
    
        // Devolver una función de limpieza para el intervalo
        return () => clearInterval(intervalId);
    };

    useEffect(() => {
        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            handleOnReady();
        };
    }, []);
    

    const handleSeek = (event) => {
        const seekTime = (event.target.value / 100) * playerRef.current.getDuration();
        setProgress(event.target.value);
        if (playerRef.current) {
            playerRef.current.seekTo(seekTime);
        }
    };

    const handleSeekStart = () => {
        setSeeking(true);
    };

    const handleSeekEnd = () => {
        setSeeking(false);
        const seekTimeInSeconds = (progress / 100) * playerRef.current.getDuration(); // Convertir el progreso a segundos
        if (playerRef.current) {
            playerRef.current.seekTo(seekTimeInSeconds); // Movemos el vídeo a la posición correspondiente
        }
    };

  

    if (playingNow) {
        return (
            <>
                <div className='player_screen'>
                    <YouTube
                        videoId={playingNow[0]?.videoId}
                        opts={opts}
                        onReady={handleOnReady}
                        onStateChange={videoOnStateChange}
                    />
                    <article>
                        <h2>{playingNow[0]?.title}<span>{playingNow[0]?.channelTitle}</span></h2>
                        <p>{playingNow[0]?.description.substr(0, 500)}</p>
                    </article>
                </div>
                <div className="player_Controls">
                    <Controls
                        playVideo={playVideo}
                        pauseVideo={pauseVideo}
                        playerStatus={playerStatus}
                        volume={volume}
                        handleVolumeChange={handleVolumeChange}
                        straming={straming}
                        progress={progress}
                        handleSeek={handleSeek}
                        handleSeekStart={handleSeekStart}
                        handleSeekEnd={handleSeekEnd}
                        duration={duration} // Pasamos la duración del video al componente de controles
                    />
                    
                </div>
            </>
        )
    } else {
        return (<div className='player_screen'>Hola</div>)
    }
}

export default Screen;
