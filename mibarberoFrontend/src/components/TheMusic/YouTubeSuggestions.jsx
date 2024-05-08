import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './YouTubeSuggestions.css'
import addVideoToList from './addVideoToList'; // Importa la función

const YouTubeSuggestions = () => {

    let playingList = useSelector(state => state.playerSlice.playingList)
    const playLists = useSelector(state => state.playerSlice.userPlayLists);
    let playingNow = useSelector(state => state.playerSlice.playingVideo)
    const [showPlayList, setShowPlayList] = useState(false);
    const dispatch = useDispatch()


    // const addVideoToList = (listId, videoId) => {
    //     const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/addvideo`;
    //     const data = {
    //       playListId: listId,
    //       videoId: videoId
    //     };
    
    //     axios
    //       .post(URL, data, getConfig())
    //       .then(res => {
    //         getUserPlayists(dispatch);
    //         dispatch(updatePlayingList(res.data.youtubeData));
    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: 'top-end',
    //           showConfirmButton: false,
    //           timer: 3000,
    //           timerProgressBar: true,
    //           didOpen: toast => {
    //             toast.addEventListener('mouseenter', Swal.stopTimer);
    //             toast.addEventListener('mouseleave', Swal.resumeTimer);
    //           },
    //         });
    
    //         Toast.fire({
    //           icon: 'success',
    //           title: 'Video Agregado',
    //         });
    //       })
    //       .catch(err => {
    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: 'top-end',
    //           showConfirmButton: false,
    //           timer: 6000,
    //           timerProgressBar: true,
    //           didOpen: toast => {
    //             toast.addEventListener('mouseenter', Swal.stopTimer);
    //             toast.addEventListener('mouseleave', Swal.resumeTimer);
    //           },
    //         });
    
    //         console.log(err);
    //         Toast.fire({
    //           icon: 'error',
    //           title: `Hubo un error, ${err.response.data.err}`,
    //         });
    //       });
    //   };

  return (
    <div className='sugerencias'>
        <h3>Quizas te gusten</h3>
        <ul className='playList'>
        {playingList?.sugerencias?.map(video=>
        video.id.videoId !=playingNow[0].videoId &&
            <li key={video.id.videoId} className='cancion'>
                <img src={video.snippet.thumbnails.default.url}/>
                {video.snippet.title.substr(0,70)}

                <button className='agregar-lista' onClick={() => setShowPlayList(video.id)}>
                <i className="fas fa-plus-circle" /> Agregar a lista
                </button>
                <ul className={`menu-listas ${showPlayList === video.id?'mostrar-listas':''}`}>
                  {playLists?.map(list => (
                    <li key={list.id} onClick={() => addVideoToList(list.id, video.id.videoId,dispatch)}>
                      {list.name}
                    </li>
                  ))}
                  <footer style={{backgroundColor:"#242424", padding:"20px"}}>
                  <button className='addToListButton' onClick={() => setShowPlayList(false)}><i className="fas fa-minus-circle" /> Ocultar</button>
                  </footer>
                </ul>
            </li>
            
        )}
        </ul>
    </div>
  )
}

export default YouTubeSuggestions