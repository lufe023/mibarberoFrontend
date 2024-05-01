import React, { useEffect, useState } from 'react'
import "./Player.css"
import PlayerHeader from './PlayerHeader'
import Screen from './Screen'
import PlayLists from './PlayLists'
import PlayingList from './PlayingList'
import Menu from '../menu/Menu'
import { useDispatch, useSelector } from 'react-redux'
import getStreaming from '../utils/getStreaming'

import getUserPlayists from './getUserPlayists.js'

const Player = () => {

  let user = useSelector(state => state.userSlice)
  const [straming, setStreaming] = useState([])
  const [playingNow, setPayingNow] = useState()
  const [closeColum, setCloseColum] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    getUserPlayists(dispatch);
  }, [])
  



useEffect(() => {
  if(user?.id){
    getStreaming(user.id,dispatch)
    }
}, [user,setPayingNow])
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

  return (
<>
<div style={{height:"59px", background:"rgba(222,207,131,0.27)"}}>
<Menu/>
    </div>
    <div className='playerBody'>
        <div className="columA">
        <PlayerHeader/>
        <Screen playingNow={playingNow} opts={opts}/>
        <PlayLists />
        </div>
        <div className={closeColum?`columB closeColum`:`columB`}>
        <i onClick={()=>setCloseColum(!closeColum)} className={`fas fa-arrow-alt-circle-left open-close ${closeColum?'':'rotate'}`} />
        <PlayingList />
        </div>
    </div>
    </>
  )
}

export default Player