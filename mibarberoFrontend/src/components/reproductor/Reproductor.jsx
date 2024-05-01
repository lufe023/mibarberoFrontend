import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import './reproductor.css';
import axios from 'axios';
import { convertirDuracion } from '../utils/convertirDuracion';
import YoutubeSearch from './YoutubeSearch';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../menu/Menu';
import getUserbyId from '../utils/getUserbyId';
import ListByuser from './ListByuser';

const Reproductor = () => {

  const [videoIndex, setVideoIndex] = useState(0);
  const [playerStatus, setPlayerStatus] = useState(-1);
  const [volume, setVolume] = useState(80);
  const [videos, setVideos] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Nuevo estado para resaltar la canción en reproducción
  const [selectedVideo, setSelectedVideo] = useState(null);
  const user = useSelector(state => state.userSlice)
  const [playList, setPlayList] = useState(user?.playlists)
  const [videoIds, setVideoIds] = useState (['']);
  const playerRef = useRef(null);  
  const handleSearchResultSelect = (video) => {
    setSelectedVideo(video);
    setVideoIds((prevVideoIds) => [...prevVideoIds, video.id.videoId]);
  };






  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('videoIndex', videoIndex.toString()); 
    getUserbyId(dispatch);
  }, []);

  useEffect(() => {
    const getVideoInfo = async (videoId) => {
      try {
        const URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet,contentDetails`;
        const response = await axios.get(URL);
        return response.data.items[0];
      } catch (error) {
        console.log("Tenemos un error", error);
        return null;
      }
    };

    const obtenerDatosVideos = async () => {
      if (!videoIds) return; // Verificar si videoIds está definido
      const videosInfo = await Promise.all(videoIds.map(getVideoInfo));
      setVideos(videosInfo.filter(video => video));
    };

    obtenerDatosVideos();
  }, [videoIds]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const videoOnReady = (event) => {
    playerRef.current = event.target;
  };

  const videoOnStateChange = (event) => {
    setPlayerStatus(event.data);
  };

  const playVideo = (index) => {
    setVideoIndex(index);
    playerRef.current.playVideo();
    setHighlightedIndex(index); // Resaltar la canción que se está reproduciendo
  };

  const pauseVideo = () => {
    playerRef.current.pauseVideo();
  };

  const videoOnEnd = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  const handleVolumeChange = (event) => {
    event.preventDefault();
    setVolume(event.target.value);
    if (playerRef.current) {
      playerRef.current.setVolume(event.target.value);
    }
  };

  useEffect(() => {
    const storedIndex = localStorage.getItem('videoIndex');
    if (storedIndex !== null) {
      setVideoIndex(parseInt(storedIndex));
    }
  }, [videoIds]);

  //me quedé en esta parte definitivamente debemos ya partir todo este codigo en varios fragmentos
  useEffect(() => {
    console.log(playList)
  }, [user])

return (
    <div className='body_reproductor'>
      <div style={{minHeight:'50px'}}>

      <Menu/>
      </div>
      <header className='rp_header'>
      
      <YoutubeSearch lists={user?.playlists} onSearchResultSelect={handleSearchResultSelect} setVideoIds={setVideoIds}/>
      {selectedVideo && (
        <div>
        </div>
      )}
      </header>
      <div className='rp_container'>
        <div className='rp_pantalla'>
          <YouTube
            videoId={videoIds[videoIndex]}
            opts={opts}
            onReady={videoOnReady}
            onEnd={videoOnEnd}
            onStateChange={videoOnStateChange}
            className="rp_video_frame"
          />
        </div>
        <div className='rp_list'>
          <ul>
            {videos?.map((video, index) => (
              <li key={index} className={highlightedIndex === index ? 'highlighted rep_list' : 'rep_list'} onClick={() => playVideo(index)}>
                <img src={video.snippet.thumbnails.default.url} alt="Thumbnail del video" />
                <p>
                  {video.snippet.title.substring(0,40)}
                  <span className='artista_name'>
                    {video.snippet.channelTitle}
                  </span>
                  <span className='duration'>
                    {convertirDuracion(video.contentDetails.duration)}
                  </span>
                </p>
                <span className='playing'>
                  {highlightedIndex === index ?<i className="fas fa-music" />:""  }
                  </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='controles'>
      <img src={videos[videoIndex]?.snippet.thumbnails.default.url}/>
        <div className="reproductor">
          {videoIndex > 0 ?
            <button onClick={() => {setVideoIndex(videoIndex - 1), setHighlightedIndex(videoIndex - 1)}} className="boton boton_icono"><i className="fas fa-backward"></i>
            </button> :
            <button className="boton"><i className="fas fa-backward desactivado"></i>
            </button>
          }
          {playerStatus === 1 ?
            <button className="boton" onClick={pauseVideo}><i className="fas fa-pause boton_icono"></i></button> :
            <button className="boton" onClick={() => playVideo(videoIndex)}><i className="fas fa-play boton_icono"></i></button>
          }

          {videoIndex < videoIds.length - 1 ? <button onClick={() => {setVideoIndex(videoIndex + 1), setHighlightedIndex(videoIndex + 1)}} className="boton boton_icono"> <i className="fas fa-forward boton_icono"></i></button>
            : <button className="boton boton_icono "> <i className="fas fa-forward desactivado"></i></button>
          }
          <div className='contenedor_volumen'>
            <i className="fas fa-volume-up" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className='volumen'
            />
            <span>{volume}</span>
          </div>
        </div>
      </div>
      <ListByuser lists={user?.playlists} setVideoIds={setVideoIds}/>
    </div>
  );
};

export default Reproductor;