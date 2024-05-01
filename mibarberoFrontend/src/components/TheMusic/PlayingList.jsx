import React, { useState } from 'react'
import putStreaming from './PutStreaming'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayingVideo } from '../../store/slices/player.slice'
import setPLay from './setPlay'

const PlayingList = () => {

const dispatch = useDispatch()

  let playingList = useSelector(state => state.playerSlice.playingList)
  if(true){
    return (
    <div className='Playing_List'>
      <h4>Sonando ahora <span>{playingList?.name}</span></h4>
        <ul>
        {playingList?.videos?.map((video)=>
        <li key={video.videoId} className={video.playing?'isPLaying':''} >
          
          <img src={video.thumbnail}/>
          <p>
            {video.title.substring(0,40)}
              <span>{video.channelTitle}</span>
          </p>
          <i onClick={()=>setPLay(playingList.id, video.videoId,dispatch)} className="fas fa-play" />
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