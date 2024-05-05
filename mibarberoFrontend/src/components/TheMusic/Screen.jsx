import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import useVideoControl from './control.js';
import Controls from './Controls.jsx';
import { useDispatch, useSelector } from 'react-redux';
import CTR from './CTR.jsx';
import setPLay from './setPlay.js';

const Screen = () => {
    let playingNow = useSelector(state => state.playerSlice.playingVideo)
    let playingList = useSelector(state => state.playerSlice.playingList)
    const dispatch = useDispatch() 
    const [index, setIndex] = useState()
    const [progress, setProgress] = useState(0); // Estado para el progreso del vídeo
    const [duration, setDuration] = useState('0:00'); // Estado para la duración del video
    const [realDuration, setRealDuration] = useState(0)
    const [seeking, setSeeking] = useState(false); // Estado para controlar si se está buscando

    const { videoOnReady, playVideo, pauseVideo, videoOnStateChange, playerStatus, handleVolumeChange, volume, playerRef } = useVideoControl(); // Accedemos a playerRef desde useVideoControl

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            //volume: localStorage.getItem('volumen') || 50, // Establece el volumen según el valor almacenado en localStorage, o un valor predeterminado de 50 si no hay valor almacenado
        },
    };


      // Función para formatear el tiempo en minutos y segundos
      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


const handleOnReady = (event) => {
    videoOnReady(event || { target: null });
    // Iniciar el intervalo para actualizar el progreso del vídeo
    const intervalId = setInterval(() => {
        if (!seeking && playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            setRealDuration(playerRef.current.getDuration())
            setDuration(formatTime(duration))
            setProgress(currentTime);
        }
    }, 1000); // Actualizar cada segundo

    // Devolver una función de limpieza para el intervalo
    return () => clearInterval(intervalId);
};

useEffect(() => {
    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
        clearInterval(handleOnReady()); // Limpia el intervalo
        videoOnReady({ target: null }); // Limpia el reproductor de video
    };
}, []);

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

    const handleOnEnd = (event) => {
        // Aquí puedes realizar cualquier acción que necesites cuando el video termine
        
        if(playingList.videos.length - 1 > playingList.videos.indexOf(playingNow[0])){
        setPLay(playingList.id, playingList.videoIds[playingList.videos.indexOf(playingNow[0]) + 1].videoId, dispatch)
    }else{
        console.log("La lista terminó con este video");
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
                        onEnd={handleOnEnd}
                    />
                    <article>
                        <h2>{playingNow[0]?.title}<span>{playingNow[0]?.channelTitle}</span></h2>
                        <p>{playingNow[0]?.description.substr(0, 500)}</p>
                    </article>
                </div>
                
              
                    <Controls
                        playVideo={playVideo}
                        pauseVideo={pauseVideo}
                        playerStatus={playerStatus}
                        volume={volume}
                        handleVolumeChange={handleVolumeChange}
                        progress={progress}
                        handleSeek={handleSeek}
                        handleSeekStart={handleSeekStart}
                        handleSeekEnd={handleSeekEnd}
                        duration={duration} // Pasamos la duración del video al componente de controles
                        realDuration={realDuration}
                    />
                    
            </>
        )
    } else {
        return (<div className='player_screen'>Hola</div>)
    }
}

export default Screen;
