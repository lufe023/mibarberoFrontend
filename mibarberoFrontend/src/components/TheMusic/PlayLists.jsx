import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayingList } from '../../store/slices/player.slice';

const PlayLists = ({setStreaming}) => {

    const dispatch = useDispatch();

    let lists = useSelector(state => state.playerSlice.userPlayLists)

    return (

    <div>
        <h4>Todas mis listas</h4>
        <ul className='playList'>
            {console.log(lists)}
            {lists?.map((list)=>
            <li key={list.id} className='playList_item'>            
            {list.videos.filter((video) => video.playing === true).map((video) => (
            <img key={video.videoId} src={video.thumbnail}/>
            ))} 
            <p>{list.name} ({list.videos.length})</p>
                <div className='Playlist_Play_Ico'>
                <i className="fas fa-play" onClick={()=>dispatch(updatePlayingList(list))} />
                </div> 
        </li>
        )}
        </ul>
    </div>
    )
}

export default PlayLists