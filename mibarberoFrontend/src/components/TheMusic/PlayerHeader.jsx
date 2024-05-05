import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlayerHeader.css';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import getUserPlayists from './getUserPlayists';
import { updatePlayingList } from '../../store/slices/player.slice';

const PlayerHeader = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlayList, setShowPlayList] = useState(false);
  const [ocultar, setOcultar] = useState(false);
  const [newPlayListName, setNewPlayListName] = useState()
  const playLists = useSelector(state => state.playerSlice.userPlayLists);
  const user = useSelector(state => state.userSlice)
  const dispatch = useDispatch();
  const searchResultsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSearchSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: searchTerm,
          part: 'snippet',
          maxResults: 20,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error al buscar videos en YouTube:', error);
    }
  };

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const addVideoToList = (listId, videoId) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/addvideo`;
    const data = {
      playListId: listId,
      videoId: videoId
    };

    axios
      .post(URL, data, getConfig())
      .then(res => {
        getUserPlayists(dispatch);
        dispatch(updatePlayingList(res.data.youtubeData));
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Video Agregado',
        });
      })
      .catch(err => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        console.log(err);
        Toast.fire({
          icon: 'error',
          title: `Hubo un error, ${err.response.data.err}`,
        });
      });
  };

  const handleOutsideClick = event => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setOcultar(true);
    }
  };

  const handleHeaderFocus = () => {
    setOcultar(false);
  };

  const createNewPlayList = (e, userId, playListName, videoIds)=> {
e.preventDefault()
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist`;
    const data = {
        userId: userId, 
        name: playListName,
        videoIds: videoIds
        //videoIds is an array with objects, it is showing under 
        // videoIds: [
        //         { "videoId": "sOJRLVRMu_U", "playing":true }
        //         ]
        }

        console.log(data)
    axios.post(URL, data, getConfig())
    .then(res=>{
      getUserPlayists(dispatch)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: 'success',
            title: `se creó la lista ${playListName}`,
        });

    })
    .catch(err=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        console.log(err);
        Toast.fire({
            icon: 'error',
            title: `Hubo un error`,
        });
    })

}

  return (
    <header ref={headerRef} className='header_player' onFocus={handleHeaderFocus}>
      <form onSubmit={handleSearchSubmit}>
        <div className='group_form'>
          <input
            type='text'
            className='player_search_input'
            placeholder='Encuentra todas las canciones de youtube'
            onChange={handleSearchInputChange}
            value={searchTerm}
          />
          <button className='player_btn_buscar'>
            <i className='fas fa-search' />
          </button>
        </div>
      </form>
      {!ocultar && searchTerm && searchResults.length > 0 && (
        <ul ref={searchResultsRef} className='searchResults' style={{ padding: '20px' }}>
          {searchResults.map(video => (
            <li key={video.id.videoId} className='search_item'>
              <img src={video.snippet.thumbnails.default.url} alt='Thumbnail del video' />
              <p>{video.snippet.title}</p>
              <button className='addToListButton' onClick={() => setShowPlayList(video.id)}>
                <i className="far fa-file-audio" /> Agregar a lista
                </button>
              <div className={`playListMenu ${showPlayList === video.id?'showPlayList':''}`}>
                  {playLists?.map(list => (
                    <li key={list.id} onClick={() => addVideoToList(list.id, video.id.videoId)}>
                      {list.name} ({list.videos.length})
                      
                    </li>
                  ))}
                  <div style={{padding:"20px"}}>
                    <form onSubmit={(e)=>createNewPlayList(e,user.id,newPlayListName,[{ "videoId": video.id.videoId,"playing":true }])}>
                    <input name='playListName' type='text' onChange={(e)=>setNewPlayListName(e.target.value)} className='advertisement-input' placeholder='Nombre de tu lista'></input>
                    <button className='advertisement-btn'>Crear PlayList</button>
                    </form>
                
                  </div>
                  <footer style={{backgroundColor:"#242424", padding:"20px"}}>
                  <button className='addToListButton' onClick={() => setShowPlayList(false)}><i className="fas fa-minus-circle" /> Ocultar</button>
                  </footer>
                </div>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default PlayerHeader;
