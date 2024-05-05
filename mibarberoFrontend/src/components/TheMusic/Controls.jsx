import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Controles.css';
import { updatePlayingVideo } from '../../store/slices/player.slice';
import setPLay from './setPlay';

const Controls = ({ pauseVideo, playVideo, playerStatus, volume, handleVolumeChange, progress, handleSeek, handleSeekStart, handleSeekEnd, duration, realDuration }) => {
    const [hide, setHide] = useState(false)
    let playingList = useSelector(state => state.playerSlice.playingList);
    let playingVideo = useSelector(state => state.playerSlice.playingVideo);
    const dispatch = useDispatch();

    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  
    return (
       
        <div className={`player_Controls ${hide?'hide':''}`}>
            <div className={`miniReproductor`}>
            <button className='abrirCerrar' onClick={()=>setHide(!hide)}> <i className={`fas fa-chevron-circle-down ${hide?'rotate':''}`} /></button>
            <div className='miniMask'>
                <div>
                <img className='thumbnail' src={playingVideo[0]?.thumbnail} />
            </div>
            <div className='miniDescription'>
                <h4>
                    {playingVideo[0]?.title.substr(0, 70)}
                </h4>
            </div>
            <div className='buttonsGroupAndVolume'>
            <div className='buttonsGroup'>
                {/* Botón para ir atrás */}
                {
                    playingList.videos.indexOf(playingVideo[0]) - 1 < 0 ?
                        <button className="boton boton_icono">
                            <i className="fas fa-backward boton_icono desactivado"></i>
                        </button> :
                        <button className="boton boton_icono" onClick={() => setPLay(playingList.id, playingList.videoIds[playingList.videos.indexOf(playingVideo[0]) - 1].videoId, dispatch)}>
                            <i className="fas fa-backward boton_icono"></i>
                        </button>
                }

                {/* boton para play y pause */}
                {playerStatus === 1 ? <button className="boton" onClick={pauseVideo}><i className="fas fa-pause boton_icono"></i></button>
                    : <button className="boton" onClick={playVideo}><i className="fas fa-play boton_icono"></i></button>}

                {/* Boton para ir adelante  */}
                {playingList.videos.length - 1 > playingList.videos.indexOf(playingVideo[0]) ?
                    <button className="boton" onClick={() => setPLay(playingList.id, playingList.videoIds[playingList.videos.indexOf(playingVideo[0]) + 1].videoId, dispatch)}>
                        <i className="fas fa-forward boton_icono"></i>
                    </button>
                    : <button className="boton"> <i className="fas fa-forward boton_icono desactivado"></i></button>
                }
                </div>
                <div className='volumenButton'>
                    <i className="fas fa-volume-up" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={localStorage.getItem("volumen")}
                        onChange={handleVolumeChange}
                        className='volumen'
                    />
                    <span style={{ color: "white" }}>{volume}</span>
                </div>
                </div>
            </div>
            <div className='progessBarContainer'>
                {/* Barra de progreso */}
                <span>{formatTime(progress)}</span> 
                <input
                    type="range"
                    className="progress-bar"
                    min="0:00"
                    max={realDuration}
                    value={progress}
                    onChange={handleSeek}
                    onMouseDown={handleSeekStart}
                    onMouseUp={handleSeekEnd}
                />
                <span>{duration}</span>
            </div>
            <style jsx>{`
    .progress-bar {
        /* Establece el tamaño de la barra */
        width: 100%;
        height: 3px;
        /* Elimina los estilos predeterminados */
        -webkit-appearance: none;
        appearance: none;
        /* Establece el fondo de la barra */
        // background: linear-gradient(to right, red 0%, red calc(${progress}% - 5px), transparent calc(${progress}% - 5px), transparent 100%);
        /* Establece el color de la barra de progreso */
        background: linear-gradient(to right, #FACD66 0%, #FACD66 ${progress}%, transparent ${progress}%);
        /* Establece el estilo del thumb */
        cursor: pointer;
    }

    .progress-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        /* Establece el color del thumb (punto que se mueve) */
        background:#FACD66;
        /* Establece el tamaño del thumb */
        width: 15px; /* Establece el ancho del thumb (el control deslizante) */
        height: 15px;
        margin-top:-7px;
        /* Asegura que el thumb sea redondo */
        border-radius: 50%;
        /* Oculta el borde predeterminado del thumb */
        border: none;
        /* Permite personalizar el cursor cuando se pasa sobre el thumb */
        cursor: e-resize;
    }
    .progress-bar::-webkit-slider-runnable-track {
        outline: none;
        background-color: gray;
        height: 1px;
        
      }
`}</style>

        </div>
        </div>
    );
}

export default Controls;
