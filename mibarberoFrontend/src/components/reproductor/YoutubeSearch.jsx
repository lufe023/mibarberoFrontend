import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YoutubeSearch.css'
import getConfig from '../utils/getConfig';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import getUserbyId from '../utils/getUserbyId';

const YoutubeSearch = ({lists}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false)
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getUserbyId(dispatch);
  }, [])


  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: searchTerm,
          part: 'snippet',
          maxResults: 20, // Puedes ajustar este número según tus necesidades
          key: import.meta.env.VITE_YOUTUBE_API_KEY, // Reemplaza con tu propia clave de API de YouTube
        },
      });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error al buscar videos en YouTube:', error);
    }
  };

    const addVideoToList = (listId, videoId) => {
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/addvideo`;
      const data = {
        playListId: listId,
        videoId: videoId
    }

        axios
          .post(URL, data, getConfig())
          .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'Video Agregado'
            });
      })
      .catch(err =>{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
    console.log(err)
        Toast.fire({
          icon: 'error',
          title: `Hubo un error, ${err.response.data.err}`
        });
      })
    }


  return (
    <div  onFocus={()=>setShow(true)} className='search'>
      <form onSubmit={handleSearchSubmit} className='sear_form' >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Buscar en YouTube..."
          className='youtube_search_input'
        />
        <button type="submit" className='btn_buscar'>
        <i className="fas fa-search" />
          Buscar</button>
      </form>
      {show?
      <div className='hidde'>
        <p>
          Resultados de Busqueda
          <span>
            <button className='btn_hidde' onClick={(e)=>{e.stopPropagation(); setShow(false)} }>
            Ocultar <i className="fas fa-times-circle" />
            </button>
            </span>
        </p>
        </div>
        :""}

        {show?
      <ul className='search_list'>
        {searchResults.map((video) => (
          <li key={video.id.videoId} className='search_item'>
            
            <img src={video.snippet.thumbnails.default.url} alt="Thumbnail del video" />
            <p>{video.snippet.title}</p>
            <button className='add'>
            <i className="fas fa-heart" /> Agregar a lista
            </button>
            <ul className='addToList'>
            {lists?.map((list) => (
          <li key={list.id}  onClick={(e) => { e.stopPropagation(); addVideoToList(list.id,video.id.videoId)}}>
            {list.name}{' '}
            <span>
              {'(' + list.videoIds.length + ')'}
            </span>
          </li>
        ))}
            </ul>
          </li>
        ))}
      </ul>
:""
}
    </div>
  );
};

export default YoutubeSearch;
