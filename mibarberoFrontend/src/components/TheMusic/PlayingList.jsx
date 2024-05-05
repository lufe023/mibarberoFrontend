import React, { useState } from 'react'
import putStreaming from './PutStreaming'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayingList, updatePlayingVideo } from '../../store/slices/player.slice'
import setPLay from './setPlay'
import './PlayingList.css'
import axios from 'axios'
import getConfig from '../utils/getConfig'
import getUserPlayists from './getUserPlayists'
import Swal from 'sweetalert2'

const PlayingList = () => {

const dispatch = useDispatch()

  let playingList = useSelector(state => state.playerSlice.playingList)
  const deleteVideoFromList = (listId, videoId) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/deletevideo/${listId}/${videoId}`;

        const Toast =Swal.fire({
          title: "¿Estás seguro?",
          text: "Se eliminará este video",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarlo!"
        }).then((result) => {
          if (result.isConfirmed) {

            axios
            .delete(URL,getConfig())
            .then(res => {
              // console.log(res.data.youtubeData.videoIds[0].videoId)
              // console.log(listId,(res.data.youtubeData.videos?.filter((video) => video.playing == true)[0].videoId !=-1?res.data.youtubeData.videos?.filter((video) => video.playing == true)[0].videoId:res.data.youtubeData.videos[0].videoId))
              // setPLay(listId,(res.data.youtubeData.videos?.filter((video) => video.playing == true)[0].videoId ||  res.data.youtubeData.videos[0].videoId),dispatch)
              // console.log(res.data.youtubeData.videos?.filter((video) => video.playing == true)[0].videoId)
              // console.log([res.data.youtubeData.videos[0]])
              // console.log(res.data.youtubeData.videos[0].videoId)
              getUserPlayists(dispatch);
              dispatch(updatePlayingList(res.data.youtubeData))
              Swal.fire({
                title: "Video Eliminado!",
                text: "El video ha sido removido de la lista",
                icon: "success"
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
            })
            
          }
        });
  };

  if(true){
    return (
    <div className='Playing_List'>
      <h4>Sonando ahora <span>{playingList?.name}</span></h4>
        <ul>
        {playingList?.videos?.map((video)=>
        <li key={video.id} >
          <img src={video.thumbnail}/>
          <p>
            {video.title.substring(0,40)}
              <span>{video.channelTitle}</span>
          </p>
          <div className='itemsActions'>
      
          <i onClick={()=>setPLay(playingList.id, video.videoId,dispatch)} className="fas fa-play" />

          {video.playing? <i className="fas fa-music" />
          :<i onClick={()=>deleteVideoFromList(playingList.id,video.videoId)} className="fas fa-trash-alt" />
          }
          </div>
        </li>
  
        )
        } 
        </ul>
    </div>
  )}else{
    return(
      <div className='Playing_List'>
      </div>
    )
  }
}

export default PlayingList