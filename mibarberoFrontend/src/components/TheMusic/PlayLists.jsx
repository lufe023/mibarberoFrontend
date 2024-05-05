import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayingList } from '../../store/slices/player.slice';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import Swal from 'sweetalert2';
import getUserPlayists from './getUserPlayists';


const PlayLists = ({setCloseColum}) => {

    const user = useSelector(state => state.userSlice)
    const dispatch = useDispatch();
    let lists = useSelector(state => state.playerSlice.userPlayLists)



const createNewPlayList = (userId, playListName, videoIds)=> {

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

    const handleCreatePLayList = (e) => {
        e.preventDefault()
        let playListName = e.target.playListName.value.trim()
        createNewPlayList(user.id,playListName,[])
    }

    const deleteList = (listId) => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/playlist/deletelist/${listId}`;
    
            const Toast =Swal.fire({
              title: "¿Estás seguro?",
              text: "Se eliminará esta lista con todos sus videos, esta acción no se puede deshacer",
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
                getUserPlayists(dispatch);
                  Swal.fire({
                    title: "Lista Eliminada!",
                    text: "La lista ha sido eliminada con exito",
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


    return (
<>
<div className='newPLayList'>  
        <div className='advertisement'>
        <p>
            Crea tu playList personalizada y agrega todas las canciones que quieras. <span>
            No hay limites
            </span>
        </p>
        <img src='./listening-music 1.png'/>
        </div>
        <form onSubmit={handleCreatePLayList}>
        <input name='playListName' type='text' className='advertisement-input' placeholder='Nombre de tu lista'></input>
        <button className='advertisement-btn'>Crear PlayList</button>
        </form>
        </div>
    <div>
        <h3>Todas mis listas</h3>
        <ul className='playList'>
            {lists?.map((list)=>
            <li key={list.id} className='playList_item'>            
            {list?.videos?.filter((video) => video.playing === true).map((video) => (
                <img key={video.videoId} src={video.thumbnail}/>
            ))} 
            
            <p>{list.name} ({list.videos.length})</p>
            
                <div className='Playlist_Play_Ico'>
                <i className="fas fa-edit" />
                <i className="fas fa-trash-alt" onClick={()=>{deleteList(list.id), setCloseColum(false)}} />
                <i className="fas fa-play" onClick={()=>{dispatch(updatePlayingList(list)), setCloseColum(false)}} />
                </div> 
        </li>
        )}

        </ul>

        </div>
    
        </>
    )
}

export default PlayLists