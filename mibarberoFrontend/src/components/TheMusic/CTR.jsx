import React, { useEffect, useState } from 'react'

const CTR = ({playVideo, pauseVideo, playerStatus, volume, handleVolumeChange, straming, setPayingNow, index, setIndex}) => {

 

  return (
        <>
        <div className=''>
        <img src="https://i.ytimg.com/vi/zbV04cTSOGE/default.jpg" />
        </div>
        <div>
        <p>
        </p>
        </div>
        <div className='botones_control'>
        {index <= 0?<button className="boton boton_icono" ><i className="fas fa-backward boton_icono desactivado"></i></button>
        :<button onClick={() => { setPayingNow([straming.videos[index - 1]]); setIndex(index - 1); }} className="boton boton_icono" ><i className="fas fa-backward boton_icono"></i></button>}
        
            {playerStatus==1?<button className="boton" onClick={pauseVideo}><i className="fas fa-pause boton_icono"></i></button> 
            :<button className="boton" onClick={playVideo}><i className="fas fa-play boton_icono"></i></button>}
            
            {index + 1 >= straming.videos.length?
            <button className="boton" >
              <i className="fas fa-forward boton_icono desactivado"></i>
            </button>
            :<button onClick={() => { setPayingNow([straming.videos[index + 1]]); setIndex(index + 1); }} className="boton boton_icono" >
              <i className="fas fa-forward boton_icono"></i>
              </button>
              }
              
        </div>

          <div className='volumenButton'>
          <i className="fas fa-volume-up" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className='volumen'
            />
            <span style={{color:"white"}}>{volume}</span>
          </div>

          
        </>
  )
}

export default CTR